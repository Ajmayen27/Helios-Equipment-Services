/* Helios Equipment Services – product catalogue (demo data).
   Codes, names, families and list prices match the Salesforce Products and Standard Price Book (WBS 4-01).
   Edit this file to change what the website shows; every page reads from it. */
window.HES_PRODUCTS = [
  {
    code: "CH-075", name: "Compact Chiller 75 kW", family: "Chiller", price: 38500,
    image: "assets/img/chiller.svg", accent: "#0176d3", tag: "Compact",
    summary: "Compact air-cooled chiller for small process lines and server rooms.",
    specs: { "Cooling capacity": "75 kW", "Condenser": "Air-cooled", "Refrigerant": "R32", "Footprint": "2.1 × 1.1 m", "Noise level": "62 dB(A)" },
    uses: ["Server rooms", "Small process lines", "Laboratories"]
  },
  {
    code: "CH-200", name: "Air-Cooled Chiller 200 kW", family: "Chiller", price: 84000,
    image: "assets/img/chiller.svg", accent: "#0b5cab", tag: "Best seller",
    summary: "Air-cooled chiller for mid-size cold stores and food processing.",
    specs: { "Cooling capacity": "200 kW", "Condenser": "Air-cooled", "Refrigerant": "R454B", "Footprint": "4.2 × 2.2 m", "Noise level": "68 dB(A)" },
    uses: ["Cold stores", "Food processing", "Plastics moulding"]
  },
  {
    code: "CH-400", name: "Water-Cooled Chiller 400 kW", family: "Chiller", price: 142000,
    image: "assets/img/chiller.svg", accent: "#014486", tag: "Industrial",
    summary: "Water-cooled chiller for large industrial cooling with a cooling tower.",
    specs: { "Cooling capacity": "400 kW", "Condenser": "Water-cooled", "Refrigerant": "R1234ze", "Footprint": "3.6 × 1.6 m", "Efficiency (SEER)": "7.1" },
    uses: ["Chemical plants", "Data centres", "Breweries"]
  },
  {
    code: "CH-650", name: "Water-Cooled Chiller 650 kW", family: "Chiller", price: 205000,
    image: "assets/img/chiller.svg", accent: "#032d60", tag: "Heavy duty",
    summary: "Water-cooled chiller for heavy industrial and district cooling plants.",
    specs: { "Cooling capacity": "650 kW", "Condenser": "Water-cooled", "Refrigerant": "R1234ze", "Footprint": "4.8 × 1.9 m", "Efficiency (SEER)": "7.4" },
    uses: ["District cooling", "Steel & metals", "Large campuses"]
  },
  {
    code: "PC-030", name: "Piston Compressor 30 kW", family: "Compressor", price: 14500,
    image: "assets/img/compressor.svg", accent: "#2e844a", tag: "Workshop",
    summary: "Piston air compressor for workshops and intermittent compressed-air demand.",
    specs: { "Motor power": "30 kW", "Type": "Two-stage piston", "Max. pressure": "15 bar", "Free air delivery": "3.9 m³/min", "Receiver": "500 l" },
    uses: ["Workshops", "Garages", "Light assembly"]
  },
  {
    code: "SC-075", name: "Screw Compressor 75 kW", family: "Compressor", price: 46000,
    image: "assets/img/compressor.svg", accent: "#22683e", tag: "Continuous duty",
    summary: "Oil-injected screw compressor for continuous compressed air in production plants.",
    specs: { "Motor power": "75 kW", "Type": "Oil-injected screw, VSD", "Max. pressure": "13 bar", "Free air delivery": "13.2 m³/min", "Noise level": "69 dB(A)" },
    uses: ["Production lines", "Packaging", "Textiles"]
  },
  {
    code: "SC-160", name: "Screw Compressor 160 kW", family: "Compressor", price: 79000,
    image: "assets/img/compressor.svg", accent: "#194e31", tag: "High demand",
    summary: "Oil-injected screw compressor for high-demand compressed-air systems.",
    specs: { "Motor power": "160 kW", "Type": "Oil-injected screw, VSD", "Max. pressure": "13 bar", "Free air delivery": "28.5 m³/min", "Heat recovery": "Up to 94 %" },
    uses: ["Automotive plants", "Glass production", "Central air rooms"]
  },
  {
    code: "AD-500", name: "Refrigerated Air Dryer 500 m3/h", family: "Air Dryer", price: 9800,
    image: "assets/img/airdryer.svg", accent: "#dd7a01", tag: "Air treatment",
    summary: "Refrigerated air dryer that removes moisture from compressed air after the compressor.",
    specs: { "Capacity": "500 m³/h", "Pressure dew point": "+3 °C", "Max. pressure": "16 bar", "Refrigerant": "R513A", "Pressure drop": "0.15 bar" },
    uses: ["After any compressor", "Paint shops", "Pneumatic tools"]
  }
];

window.HES_FAMILIES = [
  { key: "Chiller", label: "Chillers", blurb: "Air- and water-cooled chillers from 75 to 650 kW." },
  { key: "Compressor", label: "Compressors", blurb: "Piston and screw compressors from 30 to 160 kW." },
  { key: "Air Dryer", label: "Air Dryers", blurb: "Refrigerated dryers for clean, dry compressed air." }
];
