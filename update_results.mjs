// Haalt WK 2026-uitslagen op via football-data.org en schrijft results.js.
// Geen LLM, deterministisch. Vereist secret FOOTBALL_DATA_TOKEN.
import { writeFileSync, readFileSync } from "node:fs";

const GROUPS = {
  A:["Mexico","Zuid-Afrika","Zuid-Korea","Tsjechië"],
  B:["Canada","Bosnië-Herz.","Qatar","Zwitserland"],
  C:["Brazilië","Marokko","Haïti","Schotland"],
  D:["Verenigde Staten","Paraguay","Australië","Turkije"],
  E:["Duitsland","Curaçao","Ivoorkust","Ecuador"],
  F:["Nederland","Japan","Zweden","Tunesië"],
  G:["België","Egypte","Iran","Nieuw-Zeeland"],
  H:["Spanje","Kaapverdië","Saoedi-Arabië","Uruguay"],
  I:["Frankrijk","Senegal","Irak","Noorwegen"],
  J:["Argentinië","Algerije","Oostenrijk","Jordanië"],
  K:["Portugal","Congo","Oezbekistan","Colombia"],
  L:["Engeland","Kroatië","Ghana","Panama"]
};
const RR=[[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]];

// Engelse/alternatieve namen -> Nederlandse naam
const ALIASES = {
  "Mexico":["mexico"],"Zuid-Afrika":["southafrica"],"Zuid-Korea":["southkorea","korearepublic","republicofkorea","korea"],
  "Tsjechië":["czechia","czechrepublic"],"Canada":["canada"],"Bosnië-Herz.":["bosniaandherzegovina","bosniaherzegovina","bosnia"],
  "Qatar":["qatar"],"Zwitserland":["switzerland"],"Brazilië":["brazil"],"Marokko":["morocco"],"Haïti":["haiti"],
  "Schotland":["scotland"],"Verenigde Staten":["unitedstates","usa","unitedstatesofamerica"],"Paraguay":["paraguay"],
  "Australië":["australia"],"Turkije":["turkiye","turkey"],"Duitsland":["germany"],"Curaçao":["curacao"],
  "Ivoorkust":["ivorycoast","cotedivoire"],"Ecuador":["ecuador"],"Nederland":["netherlands","holland"],"Japan":["japan"],
  "Zweden":["sweden"],"Tunesië":["tunisia"],"België":["belgium"],"Egypte":["egypt"],"Iran":["iran","iriran"],
  "Nieuw-Zeeland":["newzealand"],"Spanje":["spain"],"Kaapverdië":["capeverde","caboverde"],"Saoedi-Arabië":["saudiarabia"],
  "Uruguay":["uruguay"],"Frankrijk":["france"],"Senegal":["senegal"],"Irak":["iraq"],"Noorwegen":["norway"],
  "Argentinië":["argentina"],"Algerije":["algeria"],"Oostenrijk":["austria"],"Jordanië":["jordan"],"Portugal":["portugal"],
  "Congo":["drcongo","congodr","democraticrepublicofthecongo","congo"],"Oezbekistan":["uzbekistan"],"Colombia":["colombia"],
  "Engeland":["england"],"Kroatië":["croatia"],"Ghana":["ghana"],"Panama":["panama"]
};

const norm = s => (s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]/g,"");

// normalized -> NL naam (inclusief de NL-naam zelf)
const NAME2NL = {};
for (const [nl, arr] of Object.entries(ALIASES)) {
  NAME2NL[norm(nl)] = nl;
  for (const a of arr) NAME2NL[norm(a)] = nl;
}
const resolve = name => NAME2NL[norm(name)] || null;

// wedstrijd-lookup op ongeordend teampaar -> { id, home, away }
const LOOKUP = {};
for (const g of Object.keys(GROUPS)) {
  RR.forEach((p,i)=>{
    const home=GROUPS[g][p[0]], away=GROUPS[g][p[1]];
    const key=[home,away].sort().join("|");
    LOOKUP[key]={ id:g+"-"+i, home, away };
  });
}

export function buildResults(apiMatches){
  const matches={}; let champion=""; const warnings=[];
  for (const m of apiMatches){
    const st=(m.status||"").toUpperCase();
    if (st!=="FINISHED") continue;
    const ft=m.score&&m.score.fullTime; if(!ft||ft.home==null||ft.away==null) continue;
    const hNL=resolve(m.homeTeam&&m.homeTeam.name), aNL=resolve(m.awayTeam&&m.awayTeam.name);
    const stage=(m.stage||"").toUpperCase();
    if (stage==="FINAL"){
      const w=m.score.winner; const wt=w==="HOME_TEAM"?hNL:w==="AWAY_TEAM"?aNL:"";
      if (wt) champion=wt;
    }
    if(!hNL||!aNL){ warnings.push(`Onbekend team: ${m.homeTeam&&m.homeTeam.name} / ${m.awayTeam&&m.awayTeam.name}`); continue; }
    const key=[hNL,aNL].sort().join("|"); const found=LOOKUP[key];
    if(!found) continue; // knock-out of niet-groepsfase
    matches[found.id] = (hNL===found.home) ? [ft.home,ft.away] : [ft.away,ft.home];
  }
  return { matches, champion, warnings };
}

export function renderFile({matches, champion}){
  const order = Object.keys(matches).sort((a,b)=>{
    const [ga,ia]=a.split("-"), [gb,ib]=b.split("-");
    return ga===gb ? (+ia-+ib) : ga.localeCompare(gb);
  });
  const updated = new Intl.DateTimeFormat("nl-NL",{ timeZone:"Europe/Amsterdam", day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" }).format(new Date());
  let out = `// Uitslagen WK 2026 — automatisch bijgewerkt via football-data.org.\n`;
  out += `// Niet handmatig bewerken; dit bestand wordt overschreven door de workflow.\n`;
  out += `window.RESULTS = {\n  updated: ${JSON.stringify(updated)},\n  champion: ${JSON.stringify(champion)},\n  matches: {\n`;
  out += order.map(id=>`    ${JSON.stringify(id)}: [${matches[id][0]}, ${matches[id][1]}]`).join(",\n");
  out += `\n  }\n};\n`;
  return out;
}

async function main(){
  const token = process.env.FOOTBALL_DATA_TOKEN;
  if(!token){ console.error("FOUT: secret FOOTBALL_DATA_TOKEN ontbreekt."); process.exit(1); }
  const resp = await fetch("https://api.football-data.org/v4/competitions/WC/matches", { headers:{ "X-Auth-Token": token } });
  if(!resp.ok){ console.error("API-fout:", resp.status, await resp.text()); process.exit(1); }
  const data = await resp.json();
  const { matches, champion, warnings } = buildResults(data.matches||[]);
  warnings.forEach(w=>console.warn("WAARSCHUWING:", w));
  console.log(`Gevonden afgeronde groepswedstrijden: ${Object.keys(matches).length}${champion?` | kampioen: ${champion}`:""}`);
  writeFileSync("results.js", renderFile({matches, champion}));
  console.log("results.js bijgewerkt.");
}

if (import.meta.url === `file://${process.argv[1]}`) main();
