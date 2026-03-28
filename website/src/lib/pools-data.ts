import orchardImg from "@/assets/orchard.jpg";
import timberImg from "@/assets/timber.jpg";
import harvestImg from "@/assets/harvest.jpg";
import vineyardImg from "@/assets/vineyard.jpg";
import coffeeImg from "@/assets/coffee.jpg";

export type PoolType = "perpetual" | "epoch";
export type RiskLevel = "low" | "medium" | "high";
export type VerificationStatus = "verified" | "pending" | "in-progress";

export interface Pool {
  id: string;
  nameKey: string;
  asset: string;
  location: { ru: string; kz: string; en: string };
  poolType: PoolType;
  expectedYield: string;
  riskLevel: RiskLevel;
  verificationStatus: VerificationStatus;
  tvl: string;
  image: string;
  description: { ru: string; kz: string; en: string };
  season?: string;
}

export const pools: Pool[] = [
  {
    id: "apple-orchard-01",
    nameKey: "pool.name.apple",
    asset: "Apples",
    location: { ru: "Алматинская область, Казахстан", kz: "Алматы облысы, Қазақстан", en: "Almaty Region, Kazakhstan" },
    poolType: "perpetual",
    expectedYield: "8.2%",
    riskLevel: "low",
    verificationStatus: "verified",
    tvl: "$2.4M",
    image: orchardImg,
    description: {
      ru: "Премиальный органический яблоневый сад с 15-летним опытом. Непрерывная доходность из многократных циклов сбора различных сортов.",
      kz: "15 жылдық тәжірибесі бар премиум органикалық алма бағы. Әр түрлі сорттардан көптеген жинау циклдерінен үздіксіз кірістілік.",
      en: "Premium organic apple orchard with 15-year track record. Continuous yield from year-round harvesting cycles across multiple varietals.",
    },
  },
  {
    id: "timber-forest-01",
    nameKey: "pool.name.timber",
    asset: "Timber",
    location: { ru: "Кокшетау, Казахстан", kz: "Көкшетау, Қазақстан", en: "Kokshetau, Kazakhstan" },
    poolType: "perpetual",
    expectedYield: "6.5%",
    riskLevel: "low",
    verificationStatus: "verified",
    tvl: "$5.1M",
    image: timberImg,
    description: {
      ru: "Сертифицированное устойчивое лесное хозяйство. Древесина заготавливается с ротацией 10-летних циклов с постоянной пересадкой.",
      kz: "Сертификатталған тұрақты орман шаруашылығы. Ағаш 10 жылдық ротациялық циклдермен дайындалып, үздіксіз отырғызылады.",
      en: "Certified sustainable forestry operation. Timber harvested on rotating 10-year cycles with continuous replanting.",
    },
  },
  {
    id: "wheat-harvest-01",
    nameKey: "pool.name.wheat",
    asset: "Wheat",
    location: { ru: "Костанайская область, Казахстан", kz: "Қостанай облысы, Қазақстан", en: "Kostanay Region, Kazakhstan" },
    poolType: "epoch",
    expectedYield: "12.4%",
    riskLevel: "medium",
    verificationStatus: "verified",
    tvl: "$1.8M",
    image: harvestImg,
    description: {
      ru: "Односезонный пул сбора пшеницы. Токены представляют долю предстоящего цикла урожая. Высокая доходность, сезонный риск.",
      kz: "Бір маусымдық бидай жинау пулы. Токендер алдағы егін жинау циклінің үлесін білдіреді. Жоғары кірістілік, маусымдық тәуекел.",
      en: "Single-season wheat harvest pool. Tokens represent share of the upcoming harvest cycle. Higher yield, seasonal exposure.",
    },
    season: "Mar 2026 – Nov 2026",
  },
  {
    id: "vineyard-01",
    nameKey: "pool.name.vineyard",
    asset: "Grapes",
    location: { ru: "Туркестанская область, Казахстан", kz: "Түркістан облысы, Қазақстан", en: "Turkestan Region, Kazakhstan" },
    poolType: "epoch",
    expectedYield: "14.8%",
    riskLevel: "medium",
    verificationStatus: "in-progress",
    tvl: "$890K",
    image: vineyardImg,
    description: {
      ru: "Премиальный урожай винограда из устоявшегося виноградника. Эпохальный пул, привязанный к годовому циклу урожая и винопроизводства.",
      kz: "Қалыптасқан жүзімдіктен премиум жүзім жинау. Жылдық егін жинау және шарап өндіру цикліне байланысты дәуір пулы.",
      en: "Premium grape harvest from established vineyard. Epoch pool tied to the annual harvest and wine production cycle.",
    },
    season: "Apr 2026 – Oct 2026",
  },
  {
    id: "cotton-01",
    nameKey: "pool.name.coffee",
    asset: "Cotton",
    location: { ru: "Шымкент, Казахстан", kz: "Шымкент, Қазақстан", en: "Shymkent, Kazakhstan" },
    poolType: "perpetual",
    expectedYield: "9.7%",
    riskLevel: "medium",
    verificationStatus: "verified",
    tvl: "$3.2M",
    image: coffeeImg,
    description: {
      ru: "Хлопковое хозяйство, производящее высококачественное хлопковое волокно. Два цикла сбора в год с налаженными экспортными партнёрствами.",
      kz: "Жоғары сапалы мақта талшығын өндіретін мақта шаруашылығы. Жылына екі жинау циклі бар, қалыптасқан экспорт серіктестіктерімен.",
      en: "Cotton estate producing high-grade cotton fiber. Two harvest cycles per year with established export partnerships.",
    },
  },
  {
    id: "sunflower-01",
    nameKey: "pool.name.sunflower",
    asset: "Sunflower",
    location: { ru: "Павлодарская область, Казахстан", kz: "Павлодар облысы, Қазақстан", en: "Pavlodar Region, Kazakhstan" },
    poolType: "epoch",
    expectedYield: "18.2%",
    riskLevel: "high",
    verificationStatus: "pending",
    tvl: "$420K",
    image: harvestImg,
    description: {
      ru: "Высокодоходный пул производства подсолнечного масла. Один цикл урожая с повышенной премией за риск из-за региональных факторов.",
      kz: "Жоғары кірісті күнбағыс майы өндіру пулы. Аймақтық факторларға байланысты жоғары тәуекел сыйлығы бар бір егін жинау циклі.",
      en: "High-yield sunflower oil production pool. Single harvest cycle with higher risk premium due to regional factors.",
    },
    season: "May 2026 – Sep 2026",
  },
];

export const platformStats = {
  tvl: "$13.8M",
  activePools: 6,
  yieldRange: "6.5% – 18.2%",
  verifiedHarvests: 142,
};
