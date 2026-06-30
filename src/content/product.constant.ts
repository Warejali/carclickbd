
// product form input field values
export const productBodyStyle = [
  { value: "all", label: "All" },
  { value: "coupe", label: "Coupe" },
  { value: "convertible", label: "Convertible" },
  { value: "hatchback", label: "Hatchback" },
  { value: "sedan", label: "Sedan" },
  { value: "suv/crossover", label: "SUV/Crossover" },
  { value: "truck", label: "Truck" },
  { value: "van/minivan", label: "Van/Minivan" },
  { value: "wagon", label: "Wagon" },
];
export const productBodyStyleForCreateProduct = [
  { value: "coupe", label: "Coupe" },
  { value: "convertible", label: "Convertible" },
  { value: "hatchback", label: "Hatchback" },
  { value: "sedan", label: "Sedan" },
  { value: "suv/crossover", label: "SUV/Crossover" },
  { value: "truck", label: "Truck" },
  { value: "van/minivan", label: "Van/Minivan" },
  { value: "wagon", label: "Wagon" },
];

export const productTitleStatus = [
  { value: "clean (CT)", label: "Clean (CT)" },
  { value: "salvage", label: "Salvage" },
  { value: "rebuilt/reconstructed", label: "Rebuilt/Reconstructed" },
  { value: "junk", label: "Junk" },
  { value: "buyback", label: "Buyback" },
  { value: "bonded", label: "Bonded" },
  { value: "export only", label: "Export Only" },
  { value: "odometer rollback", label: "Odometer Rollback" },
  { value: "flood", label: "Flood" },
  { value: "non-repairable", label: "Non-Repairable" },
];

export const filterProductTransmission = [
  { value: "all", label: "All" },
  { value: "automatic", label: "Autometic" },
  { value: "manual", label: "Manual" },
];

export const homeFilterMakers = [
  { value: "all", label: "All Makers" },
  { value: "TOYOTA", label: "TOYOTA" },
  { value: "NISSAN", label: "NISSAN" },
  { value: "HONDA", label: "HONDA" },
  { value: "MITSUBISHI", label: "MITSUBISHI" },
  { value: "MAZDA", label: "MAZDA" },
  { value: "LEXUS", label: "LEXUS" },
  { value: "DAIHATSU", label: "DAIHATSU" },
  { value: "SUZUKI", label: "SUZUKI" },
  { value: "SUBARU", label: "SUBARU" },
];

export const homeFilterModelsByMaker: Record<string, { value: string; label: string }[]> = {
  TOYOTA: [
    { value: "ALLION", label: "ALLION" },
    { value: "PREMIO", label: "PREMIO" },
    { value: "PRIUS", label: "PRIUS" },
    { value: "AQUA", label: "AQUA" },
    { value: "COROLLA", label: "COROLLA" },
    { value: "COROLLA CROSS", label: "COROLLA CROSS" },
    { value: "HARRIER", label: "HARRIER" },
    { value: "RAV4", label: "RAV4" },
    { value: "NOAH", label: "NOAH" },
    { value: "VOXY", label: "VOXY" },
  ],
  NISSAN: [
    { value: "X-TRAIL", label: "X-TRAIL" },
    { value: "NOTE", label: "NOTE" },
    { value: "LEAF", label: "LEAF" },
    { value: "SERENA", label: "SERENA" },
    { value: "JUKE", label: "JUKE" },
  ],
  HONDA: [
    { value: "FIT", label: "FIT" },
    { value: "VEZEL", label: "VEZEL" },
    { value: "CR-V", label: "CR-V" },
    { value: "GRACE", label: "GRACE" },
    { value: "FREED", label: "FREED" },
  ],
  MITSUBISHI: [
    { value: "OUTLANDER", label: "OUTLANDER" },
    { value: "ECLIPSE CROSS", label: "ECLIPSE CROSS" },
    { value: "DELICA", label: "DELICA" },
  ],
  MAZDA: [
    { value: "AXELA", label: "AXELA" },
    { value: "CX-3", label: "CX-3" },
    { value: "CX-5", label: "CX-5" },
  ],
  LEXUS: [
    { value: "NX", label: "NX" },
    { value: "RX", label: "RX" },
    { value: "CT", label: "CT" },
  ],
  DAIHATSU: [
    { value: "MIRA", label: "MIRA" },
    { value: "MOVE", label: "MOVE" },
    { value: "TANTO", label: "TANTO" },
  ],
  SUZUKI: [
    { value: "SWIFT", label: "SWIFT" },
    { value: "SOLIO", label: "SOLIO" },
    { value: "WAGON R", label: "WAGON R" },
  ],
  SUBARU: [
    { value: "FORESTER", label: "FORESTER" },
    { value: "IMPREZA", label: "IMPREZA" },
    { value: "LEVORG", label: "LEVORG" },
  ],
};

export const productTransmission = [
  { value: "automatic", label: "Autometic" },
  { value: "manual", label: "Manual" },
];

export const productDrivetrain = [
  { value: "all", label: "All" },
  { value: "fwd", label: "Front-Wheel Drive (FWD)" },
  { value: "rwd", label: "Rear-Wheel Drive (RWD)" },
  { value: "awd", label: "All-Wheel Drive (AWD)" },
  { value: "4wd", label: "Four-Wheel Drive (4WD)" },
];

