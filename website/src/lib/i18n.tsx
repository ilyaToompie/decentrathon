import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Locale = "ru" | "kz" | "en";

const translations = {
  // Navbar
  "nav.explorePools": { ru: "Пулы", kz: "Пулдар", en: "Explore Pools" },
  "nav.dashboard": { ru: "Кабинет", kz: "Кабинет", en: "Dashboard" },
  "nav.transparency": { ru: "Прозрачность", kz: "Ашықтық", en: "Transparency" },
  "nav.connectWallet": { ru: "Подключить кошелёк", kz: "Әмиянды қосу", en: "Connect Wallet" },

  // Hero
  "hero.title1": { ru: "Реальная доходность от", kz: "Нақты ауыл шаруашылығынан", en: "Real Yield from" },
  "hero.title2": { ru: "реального сельского хозяйства", kz: "нақты кіріс", en: "Real Agriculture" },
  "hero.subtitle": {
    ru: "Инвестируйте в токенизированные аграрные пулы с верифицированным урожаем. Прозрачно, на блокчейне, для серьёзных инвесторов.",
    kz: "Расталған егін жинауымен токенделген аграрлық пулдарға инвестиция салыңыз. Ашық, блокчейнде, байыпты инвесторлар үшін.",
    en: "Invest in tokenized agricultural pools backed by verified harvests. Transparent, on-chain, and built for serious investors.",
  },
  "hero.explorePools": { ru: "Смотреть пулы", kz: "Пулдарды қарау", en: "Explore Pools" },
  "hero.howItWorks": { ru: "Как это работает", kz: "Қалай жұмыс істейді", en: "How It Works" },

  // Stats
  "stats.tvl": { ru: "Общая заблокированная стоимость", kz: "Жалпы құлыпталған құн", en: "Total Value Locked" },
  "stats.activePools": { ru: "Активные пулы", kz: "Белсенді пулдар", en: "Active Pools" },
  "stats.yieldRange": { ru: "Диапазон доходности", kz: "Кірістілік диапазоны", en: "Yield Range" },
  "stats.verifiedHarvests": { ru: "Верифицированные урожаи", kz: "Расталған егін жинау", en: "Verified Harvests" },

  // Proof of Harvest
  "poh.label": { ru: "Система верификации", kz: "Тексеру жүйесі", en: "Verification System" },
  "poh.title": { ru: "Proof-of-Harvest", kz: "Proof-of-Harvest", en: "Proof-of-Harvest" },
  "poh.desc": {
    ru: "Каждый доллар дохода проверяется несколькими независимыми сторонами перед распределением. Ни один субъект не контролирует отчётность — доверие распределено по всей цепочке поставок.",
    kz: "Кірістің әрбір доллары таратылмас бұрын бірнеше тәуелсіз тарап арқылы тексеріледі. Ешбір субъект есептілікті бақыламайды — сенім жеткізу тізбегі бойынша бөлінеді.",
    en: "Every dollar of yield is verified through a multi-party process before it reaches your wallet. No single entity controls reporting — trust is distributed across the supply chain.",
  },
  "poh.learnMore": { ru: "Подробнее", kz: "Толығырақ", en: "Learn More" },

  // Pool Models
  "models.label": { ru: "Модели инвестирования", kz: "Инвестициялау модельдері", en: "Investment Models" },
  "models.title": { ru: "Два способа инвестирования", kz: "Инвестициялаудың екі жолы", en: "Two Ways to Invest" },
  "models.perpetual": { ru: "Бессрочные пулы", kz: "Мерзімсіз пулдар", en: "Perpetual Pools" },
  "models.epoch": { ru: "Эпохальные пулы", kz: "Дәуір пулдары", en: "Epoch Pools" },
  "models.perpetual.1": { ru: "Токены представляют постоянную собственность", kz: "Токендер тұрақты меншікті білдіреді", en: "Tokens represent ongoing ownership" },
  "models.perpetual.2": { ru: "Непрерывное распределение дохода", kz: "Үздіксіз кіріс таратылуы", en: "Continuous income distribution" },
  "models.perpetual.3": { ru: "Получайте вознаграждение в любое время", kz: "Кез келген уақытта сыйақы алыңыз", en: "Claim rewards at any time" },
  "models.perpetual.4": { ru: "Токены остаются в обращении", kz: "Токендер айналымда қалады", en: "Tokens remain in circulation" },
  "models.epoch.1": { ru: "Сезонные инвестиционные циклы", kz: "Маусымдық инвестициялық циклдер", en: "Seasonal investment cycles" },
  "models.epoch.2": { ru: "Токены представляют долю одного урожая", kz: "Токендер бір егін жинаудың үлесін білдіреді", en: "Tokens represent one harvest share" },
  "models.epoch.3": { ru: "После урожая: погашение и выплата", kz: "Егін жинаудан кейін: өтеу және төлем", en: "After harvest: redeem and receive payout" },
  "models.epoch.4": { ru: "Токены сжигаются после погашения", kz: "Токендер өтелгеннен кейін жойылады", en: "Tokens are burned after redemption" },

  // Featured
  "featured.label": { ru: "Избранное", kz: "Таңдаулы", en: "Featured" },
  "featured.title": { ru: "Активные пулы", kz: "Белсенді пулдар", en: "Active Pools" },
  "featured.viewAll": { ru: "Все пулы", kz: "Барлық пулдар", en: "View All" },

  // Benefits
  "benefits.title": { ru: "Почему GreenYield", kz: "Неге GreenYield", en: "Why GreenYield" },
  "benefits.transparent.title": { ru: "Прозрачность", kz: "Ашықтық", en: "Transparent" },
  "benefits.transparent.desc": { ru: "Каждое событие дохода проверяется несколькими независимыми сторонами перед распределением.", kz: "Әрбір кіріс оқиғасы таратылмас бұрын бірнеше тәуелсіз тарап арқылы тексеріледі.", en: "Every revenue event is verified by multiple independent parties before distribution." },
  "benefits.trustMinimized.title": { ru: "Минимум доверия", kz: "Сенімді азайту", en: "Trust-Minimized" },
  "benefits.trustMinimized.desc": { ru: "On-chain Proof-of-Harvest устраняет зависимость от одного субъекта для отчётности.", kz: "On-chain Proof-of-Harvest есеп беру үшін бір субъектіге тәуелділікті жояды.", en: "On-chain Proof-of-Harvest removes reliance on any single entity for reporting." },
  "benefits.liquid.title": { ru: "Ликвидность", kz: "Өтімділік", en: "Liquid" },
  "benefits.liquid.desc": { ru: "Токенизированная собственность обеспечивает простой вход, выход и управление портфелем.", kz: "Токенделген меншік оңай кіруді, шығуды және портфельді басқаруды қамтамасыз етеді.", en: "Tokenized ownership enables frictionless entry, exit, and portfolio management." },
  "benefits.verified.title": { ru: "Верифицировано на блокчейне", kz: "Блокчейнде расталған", en: "On-Chain Verified" },
  "benefits.verified.desc": { ru: "Верификация Merkle root гарантирует, что только подтверждённый доход поступает держателям токенов.", kz: "Merkle root тексеруі тек расталған кірістің токен ұстаушыларына жететінін қамтамасыз етеді.", en: "Merkle root verification ensures only confirmed revenue reaches token holders." },

  // CTA
  "cta.title": { ru: "Начните получать реальную доходность", kz: "Бүгін нақты кіріс алуды бастаңыз", en: "Start Earning Real Yield Today" },
  "cta.desc": { ru: "Подключите кошелёк и исследуйте верифицированные аграрные инвестиционные пулы.", kz: "Әмияныңызды қосыңыз және расталған аграрлық инвестициялық пулдарды зерттеңіз.", en: "Connect your wallet and explore verified agricultural investment pools." },

  // Footer
  "footer.desc": { ru: "Токенизированные аграрные инвестиции с верифицированной доходностью на блокчейне.", kz: "Блокчейнде расталған кірістілігі бар токенделген аграрлық инвестициялар.", en: "Tokenized agricultural investments with on-chain verified yield." },
  "footer.platform": { ru: "Платформа", kz: "Платформа", en: "Platform" },
  "footer.resources": { ru: "Ресурсы", kz: "Ресурстар", en: "Resources" },
  "footer.legal": { ru: "Правовая информация", kz: "Құқықтық ақпарат", en: "Legal" },
  "footer.docs": { ru: "Документация", kz: "Құжаттама", en: "Documentation" },
  "footer.whitepaper": { ru: "Whitepaper", kz: "Whitepaper", en: "Whitepaper" },
  "footer.audits": { ru: "Аудиты", kz: "Аудиттер", en: "Audits" },
  "footer.terms": { ru: "Условия использования", kz: "Қолдану шарттары", en: "Terms of Service" },
  "footer.privacy": { ru: "Политика конфиденциальности", kz: "Құпиялылық саясаты", en: "Privacy Policy" },
  "footer.risk": { ru: "Раскрытие рисков", kz: "Тәуекелдерді ашу", en: "Risk Disclosure" },
  "footer.rights": { ru: "© 2026 GreenYield. Все права защищены. Не является финансовой рекомендацией.", kz: "© 2026 GreenYield. Барлық құқықтар қорғалған. Қаржылық кеңес емес.", en: "© 2026 GreenYield. All rights reserved. Not financial advice." },

  // Explore Pools page
  "explore.title": { ru: "Исследовать пулы", kz: "Пулдарды зерттеу", en: "Explore Pools" },
  "explore.subtitle": { ru: "Просматривайте верифицированные аграрные инвестиционные возможности.", kz: "Расталған аграрлық инвестициялық мүмкіндіктерді қараңыз.", en: "Browse verified agricultural investment opportunities." },
  "explore.all": { ru: "Все пулы", kz: "Барлық пулдар", en: "All Pools" },
  "explore.perpetual": { ru: "Бессрочные", kz: "Мерзімсіз", en: "Perpetual" },
  "explore.epoch": { ru: "Эпохальные", kz: "Дәуір", en: "Epoch" },

  // Pool Card
  "pool.viewPool": { ru: "Смотреть пул", kz: "Пулды қарау", en: "View Pool" },
  "pool.risk": { ru: "риск", kz: "тәуекел", en: "risk" },
  "pool.season": { ru: "Сезон", kz: "Маусым", en: "Season" },
  "pool.perpetual": { ru: "Бессрочный", kz: "Мерзімсіз", en: "Perpetual" },
  "pool.epoch": { ru: "Эпохальный", kz: "Дәуір", en: "Epoch" },
  "pool.verified": { ru: "верифицирован", kz: "расталған", en: "verified" },
  "pool.inProgress": { ru: "в процессе", kz: "орындалуда", en: "in-progress" },
  "pool.pending": { ru: "ожидание", kz: "күтілуде", en: "pending" },
  "pool.low": { ru: "низкий", kz: "төмен", en: "low" },
  "pool.medium": { ru: "средний", kz: "орташа", en: "medium" },
  "pool.high": { ru: "высокий", kz: "жоғары", en: "high" },

  // Pool Detail
  "detail.backToPools": { ru: "Назад к пулам", kz: "Пулдарға оралу", en: "Back to Pools" },
  "detail.notFound": { ru: "Пул не найден", kz: "Пул табылмады", en: "Pool not found" },
  "detail.overview": { ru: "Обзор", kz: "Шолу", en: "Overview" },
  "detail.financialModel": { ru: "Финансовая модель", kz: "Қаржылық модель", en: "Financial Model" },
  "detail.expectedYield": { ru: "Ожидаемая доходность", kz: "Күтілетін кірістілік", en: "Expected Yield" },
  "detail.tvl": { ru: "Общая заблокированная стоимость", kz: "Жалпы құлыпталған құн", en: "Total Value Locked" },
  "detail.riskLevel": { ru: "Уровень риска", kz: "Тәуекел деңгейі", en: "Risk Level" },
  "detail.revenueBreakdown": { ru: "Распределение дохода", kz: "Кіріс бөлінісі", en: "Revenue Breakdown" },
  "detail.revenueDesc.perpetual": { ru: "Доходность распределяется непрерывно по мере верификации.", kz: "Кірістілік тексерілген сайын үздіксіз бөлінеді.", en: "Yield is claimable continuously as revenue is verified." },
  "detail.revenueDesc.epoch": { ru: "Выплата после завершения урожая. Токены сжигаются при погашении.", kz: "Егін жинау аяқталғаннан кейін төлем. Токендер өтеу кезінде жойылады.", en: "Payout occurs after harvest completion. Tokens are burned upon redemption." },
  "detail.revenueFormula": { ru: "Доход = Верифицированные продажи − Верифицированные расходы. Распределение пропорционально количеству токенов.", kz: "Кіріс = Расталған сатылымдар − Расталған шығындар. Бөліну токен санына пропорционалды.", en: "Revenue = Verified Sales − Verified Costs. Distribution is proportional to token holdings." },
  "detail.pohVerification": { ru: "Верификация Proof-of-Harvest", kz: "Proof-of-Harvest тексеруі", en: "Proof-of-Harvest Verification" },
  "detail.tokenMechanics": { ru: "Механика токенов", kz: "Токен механикасы", en: "Token Mechanics" },
  "detail.mint": { ru: "Минт", kz: "Минт", en: "Mint" },
  "detail.mintDesc": { ru: "Токены выпускаются при инвестировании", kz: "Инвестициялау кезінде токендер шығарылады", en: "Tokens minted upon investment" },
  "detail.claim": { ru: "Получить", kz: "Алу", en: "Claim" },
  "detail.claimDesc": { ru: "Получайте доход в любое время", kz: "Кез келген уақытта кіріс алыңыз", en: "Claim yield anytime" },
  "detail.redeem": { ru: "Погасить", kz: "Өтеу", en: "Redeem" },
  "detail.redeemDesc": { ru: "Погашение после урожая", kz: "Егін жинаудан кейін өтеу", en: "Redeem after harvest" },
  "detail.hold": { ru: "Держать", kz: "Ұстау", en: "Hold" },
  "detail.holdDesc": { ru: "Токены остаются активными", kz: "Токендер белсенді қалады", en: "Tokens stay active" },
  "detail.burn": { ru: "Сжечь", kz: "Жою", en: "Burn" },
  "detail.burnDesc": { ru: "Токены сжигаются при выплате", kz: "Төлем кезінде токендер жойылады", en: "Tokens burned on payout" },
  "detail.investTitle": { ru: "Инвестировать в пул", kz: "Пулға инвестициялау", en: "Invest in this Pool" },
  "detail.asset": { ru: "Актив", kz: "Актив", en: "Asset" },
  "detail.type": { ru: "Тип", kz: "Түрі", en: "Type" },
  "detail.verification": { ru: "Верификация", kz: "Тексеру", en: "Verification" },
  "detail.investNow": { ru: "Инвестировать", kz: "Инвестициялау", en: "Invest Now" },
  "detail.investIn": { ru: "Инвестировать в", kz: "Инвестициялау:", en: "Invest in" },
  "detail.investModalDesc": { ru: "Подключите кошелёк и введите сумму для инвестирования.", kz: "Әмияныңызды қосыңыз және инвестициялау сомасын енгізіңіз.", en: "Connect your wallet and enter the amount to invest." },
  "detail.amount": { ru: "Сумма инвестиции (USDC)", kz: "Инвестиция сомасы (USDC)", en: "Investment Amount (USDC)" },
  "detail.tokensReceived": { ru: "Токены получены", kz: "Алынған токендер", en: "Tokens Received" },
  "detail.ownershipShare": { ru: "Доля владения", kz: "Меншік үлесі", en: "Ownership Share" },
  "detail.confirmTx": { ru: "Подключить кошелёк и подтвердить", kz: "Әмиянды қосу және растау", en: "Connect Wallet & Confirm" },
  "detail.demoNotice": { ru: "Это демонстрация. Реальная транзакция не будет выполнена.", kz: "Бұл демонстрация. Нақты транзакция орындалмайды.", en: "This is a demo. No real transaction will be executed." },

  // Dashboard
  "dash.title": { ru: "Кабинет", kz: "Кабинет", en: "Dashboard" },
  "dash.totalInvested": { ru: "Всего инвестировано", kz: "Жалпы инвестицияланған", en: "Total Invested" },
  "dash.yieldEarned": { ru: "Доход получен", kz: "Алынған кіріс", en: "Yield Earned" },
  "dash.activePools": { ru: "Активные пулы", kz: "Белсенді пулдар", en: "Active Pools" },
  "dash.claimableNow": { ru: "Доступно к получению", kz: "Қазір алуға қол жетімді", en: "Claimable Now" },
  "dash.claimableRewards": { ru: "Доступные вознаграждения", kz: "Қол жетімді сыйақылар", en: "Claimable Rewards" },
  "dash.fromPools": { ru: "Из 2 бессрочных пулов", kz: "2 мерзімсіз пулдан", en: "From 2 perpetual pools" },
  "dash.claimAll": { ru: "Получить всё", kz: "Бәрін алу", en: "Claim All Rewards" },
  "dash.tokenHoldings": { ru: "Токены в портфеле", kz: "Портфельдегі токендер", en: "Token Holdings" },
  "dash.pool": { ru: "Пул", kz: "Пул", en: "Pool" },
  "dash.tokens": { ru: "Токены", kz: "Токендер", en: "Tokens" },
  "dash.value": { ru: "Стоимость", kz: "Құны", en: "Value" },
  "dash.yield": { ru: "Доходность", kz: "Кірістілік", en: "Yield Earned" },
  "dash.action": { ru: "Действие", kz: "Әрекет", en: "Action" },
  "dash.claimAmount": { ru: "Получить", kz: "Алу", en: "Claim" },
  "dash.awaitingHarvest": { ru: "Ожидание урожая", kz: "Егін жинауды күту", en: "Awaiting Harvest" },
  "dash.txHistory": { ru: "История транзакций", kz: "Транзакция тарихы", en: "Transaction History" },
  "dash.date": { ru: "Дата", kz: "Күні", en: "Date" },
  "dash.txAction": { ru: "Действие", kz: "Әрекет", en: "Action" },
  "dash.txPool": { ru: "Пул", kz: "Пул", en: "Pool" },
  "dash.txAmount": { ru: "Сумма", kz: "Сома", en: "Amount" },
  "dash.txStatus": { ru: "Статус", kz: "Мәртебесі", en: "Status" },
  "dash.exploreMore": { ru: "Исследовать другие пулы", kz: "Басқа пулдарды зерттеу", en: "Explore More Pools" },
  "dash.invested": { ru: "Инвестировано", kz: "Инвестицияланған", en: "Invested" },
  "dash.claimed": { ru: "Получено", kz: "Алынды", en: "Claimed" },
  "dash.confirmed": { ru: "подтверждено", kz: "расталды", en: "confirmed" },

  // Transparency
  "trans.title": { ru: "Прозрачность и верификация", kz: "Ашықтық және тексеру", en: "Transparency & Verification" },
  "trans.subtitle": {
    ru: "GreenYield устраняет предположения о доверии, требуя многосторонней верификации перед распределением дохода. Вот как это работает.",
    kz: "GreenYield кез келген кіріс таратылмас бұрын көп тараптық тексеруді талап ету арқылы сенім болжамдарын жояды.",
    en: "GreenYield eliminates trust assumptions by requiring multi-party verification before any revenue is distributed. Here's exactly how it works.",
  },
  "trans.pipeline": { ru: "Пайплайн верификации", kz: "Тексеру құбыры", en: "Verification Pipeline" },
  "trans.multiParty": { ru: "Многосторонние подписи", kz: "Көп тараптық қолтаңбалар", en: "Multi-Party Signatures" },
  "trans.multiPartyDesc": {
    ru: "Ни один субъект не может в одностороннем порядке сообщать о доходах. Каждый этап верификации требует независимой криптографической подписи от разной стороны.",
    kz: "Ешбір субъект біржақты түрде кіріс туралы хабарлай алмайды. Тексерудің әрбір кезеңі басқа тараптан тәуелсіз криптографиялық қолтаңбаны талап етеді.",
    en: "No single entity can unilaterally report revenue. Each step in the verification pipeline requires an independent cryptographic signature from a different party.",
  },
  "trans.independentParties": { ru: "Независимые стороны", kz: "Тәуелсіз тараптар", en: "Independent Parties" },
  "trans.independentPartiesDesc": { ru: "Фермер, логистика, покупатель и кастодиан подписывают независимо.", kz: "Фермер, логистика, сатып алушы және кастодиан тәуелсіз қол қояды.", en: "Farmer, logistics, buyer, and custodian each sign independently." },
  "trans.cryptoProof": { ru: "Криптографическое доказательство", kz: "Криптографиялық дәлел", en: "Cryptographic Proof" },
  "trans.cryptoProofDesc": { ru: "Каждая подпись верифицируема и защищена от подделки.", kz: "Әрбір қолтаңба тексерілетін және бұзудан қорғалған.", en: "Each signature is verifiable and tamper-proof." },
  "trans.dataAgg": { ru: "Агрегация данных", kz: "Деректерді біріктіру", en: "Data Aggregation" },
  "trans.dataAggDesc": { ru: "Все подписанные данные объединяются в один верифицируемый набор данных.", kz: "Барлық қол қойылған деректер бір тексерілетін деректер жиынтығына біріктіріледі.", en: "All signed data is combined into a single verifiable dataset." },
  "trans.fraudResist": { ru: "Устойчивость к мошенничеству", kz: "Алаяқтыққа төзімділік", en: "Fraud Resistance" },
  "trans.fraudResistDesc": { ru: "Сговор требует компрометации всех четырёх независимых сторон.", kz: "Күдікті келісім барлық төрт тәуелсіз тарапты компрометациялауды талап етеді.", en: "Collusion requires compromising all four independent parties." },
  "trans.merkle": { ru: "Верификация Merkle Root", kz: "Merkle Root тексеруі", en: "Merkle Root Verification" },
  "trans.whatIsMerkle": { ru: "Что такое Merkle Root?", kz: "Merkle Root дегеніміз не?", en: "What is a Merkle Root?" },
  "trans.merkleDesc": {
    ru: "Merkle root — это единый криптографический хэш, который обобщает весь набор данных. Он позволяет любому проверить, что конкретные данные были включены в верифицированный набор, без необходимости проверять каждую запись.",
    kz: "Merkle root — бұл бүкіл деректер жиынтығын қорытындылайтын бірыңғай криптографиялық хэш. Ол кез келген адамға белгілі бір деректердің расталған жиынтыққа қосылғанын әрбір жазбаны тексермей-ақ тексеруге мүмкіндік береді.",
    en: "A Merkle root is a single cryptographic hash that summarizes an entire dataset. It allows anyone to verify that specific data was included in the verified set without needing to inspect every record.",
  },
  "trans.howUsed": { ru: "Как GreenYield это использует", kz: "GreenYield мұны қалай пайдаланады", en: "How GreenYield Uses It" },
  "trans.merkleSteps": {
    ru: ["Все записи верификации (урожай, логистика, покупатель, кастодиан) собираются.", "Каждая запись хэшируется индивидуально.", "Хэши попарно хэшируются вместе, формируя древовидную структуру.", "Единый корневой хэш (Merkle root) сохраняется в блокчейне.", "Любой может проверить отдельную запись по корню."],
    kz: ["Барлық тексеру жазбалары (егін жинау, логистика, сатып алушы, кастодиан) жиналады.", "Әрбір жазба жеке хэштеледі.", "Хэштер жұп-жұбымен хэштеліп, ағаш құрылымын қалыптастырады.", "Бірыңғай түбір хэші (Merkle root) блокчейнде сақталады.", "Кез келген адам жеке жазбаны түбірге қарсы тексере алады."],
    en: ["All verification records (harvest, logistics, buyer, custodian) are collected.", "Each record is hashed individually.", "Hashes are paired and hashed together, forming a tree structure.", "The single root hash (Merkle root) is stored on the blockchain.", "Anyone can verify any individual record against the root."],
  },
  "trans.dataFlow": { ru: "Поток данных от фермы до блокчейна", kz: "Фермадан блокчейнге дейінгі деректер ағыны", en: "Farm-to-Blockchain Data Flow" },
  "trans.dataFlowSteps": {
    ru: [
      { title: "Ферма", desc: "Данные об урожае записываются на месте — количество, качество, дата, местоположение." },
      { title: "Цепочка поставок", desc: "Логистика и покупатель независимо верифицируют свою часть транзакции." },
      { title: "Расчёт", desc: "Кастодиан подтверждает получение платежа и чистый доход после верифицированных расходов." },
      { title: "Блокчейн", desc: "Merkle root всех верифицированных данных сохраняется неизменяемо в блокчейне." },
      { title: "Распределение", desc: "Смарт-контракт распределяет верифицированный доход пропорционально держателям токенов." },
    ],
    kz: [
      { title: "Ферма", desc: "Егін жинау деректері бастапқы жерде жазылады — саны, сапасы, күні, орны." },
      { title: "Жеткізу тізбегі", desc: "Логистика мен сатып алушы транзакцияның өз бөлігін тәуелсіз тексереді." },
      { title: "Есеп айырысу", desc: "Кастодиан төлемнің түсуін және расталған шығындардан кейінгі таза кірісті растайды." },
      { title: "Блокчейн", desc: "Барлық расталған деректердің Merkle root-ы блокчейнде өзгертілмейтін түрде сақталады." },
      { title: "Тарату", desc: "Смарт-контракт расталған кірісті токен ұстаушыларға пропорционалды түрде таратады." },
    ],
    en: [
      { title: "Farm", desc: "Harvest data recorded at origin — quantity, quality, date, location." },
      { title: "Supply Chain", desc: "Logistics and buyer each independently verify their portion of the transaction." },
      { title: "Settlement", desc: "Custodian confirms payment receipt and net revenue after verified costs." },
      { title: "Blockchain", desc: "Merkle root of all verified data is stored immutably on-chain." },
      { title: "Distribution", desc: "Smart contract distributes verified revenue proportionally to token holders." },
    ],
  },
  "trans.exploreVerified": { ru: "Смотреть верифицированные пулы", kz: "Расталған пулдарды қарау", en: "Explore Verified Pools" },

  // Proof of Harvest Timeline steps
  "poh.step1.title": { ru: "Урожай зафиксирован", kz: "Егін жинау тіркелді", en: "Harvest Recorded" },
  "poh.step1.desc": { ru: "Фермер отправляет данные об урожае: количество, качество и дату.", kz: "Фермер егін жинау деректерін жібереді: саны, сапасы және күні.", en: "Farmer submits harvest data including quantity, quality, and date." },
  "poh.step2.title": { ru: "Логистика подтверждена", kz: "Логистика расталды", en: "Logistics Confirmed" },
  "poh.step2.desc": { ru: "Отправка верифицирована логистическим партнёром с весом и квитанцией.", kz: "Жеткізу логистикалық серіктес арқылы салмақ және қабылдау құжатымен расталды.", en: "Shipment verified by logistics partner with weight and delivery receipt." },
  "poh.step3.title": { ru: "Покупатель подтверждает", kz: "Сатып алушы растайды", en: "Buyer Confirms" },
  "poh.step3.desc": { ru: "Покупатель подтверждает полученное количество, качество и согласованную цену.", kz: "Сатып алушы алынған санын, сапасын және келісілген бағаны растайды.", en: "Buyer validates received quantity, quality, and agreed price." },
  "poh.step4.title": { ru: "Кастодиан верифицирует", kz: "Кастодиан тексереді", en: "Custodian Verifies" },
  "poh.step4.desc": { ru: "Кастодиан подтверждает получение платежа и расчёт средств.", kz: "Кастодиан төлемнің түсуін және қаражаттың есебін растайды.", en: "Custodian confirms payment receipt and settlement of funds." },
  "poh.step5.title": { ru: "Merkle Root сгенерирован", kz: "Merkle Root жасалды", en: "Merkle Root Generated" },
  "poh.step5.desc": { ru: "Все данные верификации агрегируются и конвертируются в криптографический Merkle root.", kz: "Барлық тексеру деректері біріктіріліп, криптографиялық Merkle root-қа айналдырылады.", en: "All verification data aggregated and converted into a cryptographic Merkle root." },
  "poh.step6.title": { ru: "Сохранено в блокчейне", kz: "Блокчейнде сақталды", en: "Stored On-Chain" },
  "poh.step6.desc": { ru: "Merkle root записан в блокчейн. Только верифицированный доход распределяется держателям токенов.", kz: "Merkle root блокчейнге жазылды. Тек расталған кіріс токен ұстаушыларына таратылады.", en: "Merkle root recorded on blockchain. Only verified revenue is distributed to token holders." },

  // Pool names and descriptions
  "pool.name.apple": { ru: "Яблоневый сад Алматы", kz: "Алматы алма бағы", en: "Almaty Apple Orchard" },
  "pool.name.timber": { ru: "Устойчивая древесина Кокшетау", kz: "Көкшетау тұрақты ағашы", en: "Kokshetau Sustainable Timber" },
  "pool.name.wheat": { ru: "Пшеница Костаная", kz: "Қостанай бидайы", en: "Kostanay Wheat Harvest" },
  "pool.name.vineyard": { ru: "Виноградник Туркестана", kz: "Түркістан жүзімдігі", en: "Turkestan Vineyard Reserve" },
  "pool.name.coffee": { ru: "Хлопковое хозяйство Шымкента", kz: "Шымкент мақта шаруашылығы", en: "Shymkent Cotton Estate" },
  "pool.name.sunflower": { ru: "Подсолнечник Павлодара", kz: "Павлодар күнбағысы", en: "Pavlodar Sunflower Epoch" },
} as const;

type TranslationKey = keyof typeof translations;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => any;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem("gy-locale");
    return (saved as Locale) || "ru";
  });

  const handleSetLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("gy-locale", newLocale);
  }, []);

  const t = useCallback(
    (key: TranslationKey) => {
      const entry = translations[key];
      if (!entry) return key;
      return (entry as any)[locale] || (entry as any)["en"] || key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};

export const localeLabels: Record<Locale, string> = {
  ru: "РУ",
  kz: "ҚЗ",
  en: "EN",
};
