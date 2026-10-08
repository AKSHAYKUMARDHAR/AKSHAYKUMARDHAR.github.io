/*
 * All text, numbers and links on the home page live in this one file.
 * Edit here; app.js reads from it. Case studies are separate pages in case-studies/.
 * Every figure is from the CV, a public GitHub README or a logged evaluation run.
 */
window.CONTENT = {
  identity: {
    name: "Akshay Dhar",
    initials: "AD",
    roleLine: "AI Product Manager · Fintech & Sustainability",
    headline: "I build AI that knows when not to answer.",
    sub: "I take AI products from problem to production, and I gate every release on an evaluation. Most recently I led a transaction categorization engine that cut uncategorized transactions from 39% to 13%.",
    availability: "Open to Associate PM, AI PM and AI Product Analyst roles · Bengaluru or remote (India) · Available now",
    location: "Bengaluru, India",
    email: "akshaykumardhar14@gmail.com",
    linkedin: "https://www.linkedin.com/in/akshaydh",
    github: "https://github.com/AKSHAYKUMARDHAR",
    cv: "assets/files/Akshay_Dhar_CV.pdf"
  },

  metrics: [
    { from: 39, to: 13, format: "fromTo", suffix: "%", label: "uncategorized transactions", source: "Catalysk, production" },
    { to: 390, prefix: "£", suffix: "K", label: "annual savings from a production ML crawler", source: "9fin" },
    { to: 5, prefix: "+", suffix: " pts", label: "category accuracy from an embedding bake-off", source: "Catalysk, production" },
    { to: 98.0, decimals: 1, suffix: "%", label: "precision on never-seen rows, LLM agent + RAG", source: "UPI Triage Agent" },
    { text: "Days → hours", label: "to onboard a new banking partner", source: "Catalysk, production" },
    { to: 15, label: "analysts mentored", source: "9fin" }
  ],

  // Work case study (employer work: no PRD or code is published)
  work: {
    badge: "Catalysk · Data Consultant · Apr - Sep 2026",
    title: "Categorize more, without trading away precision",
    text: [
      "Bank-statement transactions feed client ESG reports, and 39% of them landed uncategorized. Every uncategorized row was manual analyst work; every wrong one was an error in a client's report.",
      "I architected and led the categorization engine that fixed it, with a small team, and no change shipped without passing an evaluation I built first."
    ],
    highlights: [
      { num: "39% → 13%", text: "uncategorized transactions, by redesigning UPI and person-to-person categorization" },
      { num: "+5 pts", text: "category accuracy from an embedding bake-off (MiniLM, E5, BGE)" },
      { num: "21 → 36", text: "categories, with zero golden-set regression" }
    ],
    caseStudy: "case-studies/catalysk.html",
    pdf: "assets/files/case-study-catalysk.pdf"
  },

  // Personal AI product projects: each has a PRD, a case study and the code
  projects: [
    {
      title: "Is This a Scam?",
      badge: "Personal project · Oct 2026",
      sub: "A scam checker for India in Hindi, Bengali and English. Paste a message, upload a screenshot or describe a call; it never says \"safe\", and it says \"can't tell\" instead of guessing.",
      stats: [
        { num: "1 / 114", label: "false alarms on never-seen genuine messages, over two release runs" },
        { num: "0 / 96", label: "never-seen scams wrongly cleared" },
        { num: "Blocked", label: "by my own launch gate, twice: first on ambiguous messages, then on 1 false alarm", warn: true }
      ],
      tags: ["LLM", "Multilingual NLP", "Evals", "Abstention", "Prompt injection", "FastAPI"],
      caseStudy: "case-studies/scam-checker.html",
      prd: "https://github.com/AKSHAYKUMARDHAR/Is-This-A-Scam/blob/main/docs/PRD.md",
      github: "https://github.com/AKSHAYKUMARDHAR/Is-This-A-Scam",
      demo: "https://is-this-a-scam.onrender.com"
    },
    {
      title: "UPI Transaction Triage Agent",
      badge: "Personal project · Oct 2026",
      sub: "An LLM agent for the bank-statement rows a confidence gate holds back. It calls tools over MCP, looks up unknown merchants with RAG, and sends what it can't decide to a human.",
      stats: [
        { num: "98.0%", label: "precision on never-seen rows (agent + RAG)" },
        { num: "0.4%", label: "of rows left for people, down from 29.2% (golden set)" },
        { num: "0%", label: "unknown payees auto-posted wrong" }
      ],
      tags: ["LLM agents", "MCP", "RAG", "pgvector", "FastAPI", "n8n", "Evals"],
      caseStudy: "case-studies/upi-triage-agent.html",
      prd: "https://github.com/AKSHAYKUMARDHAR/UPI-Triage-Agent/blob/main/docs/PRD.md",
      github: "https://github.com/AKSHAYKUMARDHAR/UPI-Triage-Agent"
    }
  ],

  earlier: [
    { title: "End-to-End Stock Price Forecasting Pipeline", context: "Personal project · Feb - Mar 2026",
      text: "Alpha Vantage market data into PostgreSQL, with ARIMA and LSTM multi-step forecasts.",
      link: "https://github.com/AKSHAYKUMARDHAR/Real-time-stock-forecasting" },
    { title: "Electricity Market Price Forecasting", context: "MSc industry project, Energia Group · 2023",
      text: "STL and VAR forecasts on 39,354 observations for 1-day-ahead prices across the DAM, IDA and BM markets, plus a Random Forest with a £100/MWh no-trade threshold.",
      link: "https://github.com/AKSHAYKUMARDHAR/Energia-Trading-Strategy" },
    { title: "EV Customer Demand Segmentation", context: "MSc industry project, Energia Group · 2023",
      text: "K-means on 180K+ customers, narrowed to 5,985 likely EV owners for targeting.",
      link: "https://github.com/AKSHAYKUMARDHAR/Energia-Suspected-EV-Customers" },
    { title: "Artist-Fan Sentiment Analysis", context: "MSc project · 2022 - 2023",
      text: "195K+ comments; RoBERTa sentiment at 78% accuracy (+5 points over LSTM), fan segments and BERTopic topics.",
      link: "https://github.com/AKSHAYKUMARDHAR/NLP-Driven-Artist-Fan-Sentiment-Analysis" },
    { title: "Bird Song Recognition", context: "Academic project",
      text: "A CNN on spectrograms classifying 4 species at 88.88% accuracy.",
      link: "https://github.com/AKSHAYKUMARDHAR/Deloitte-Bird-Song-Recognition" },
    { title: "Similar Movies Retrieval", context: "MSc coursework · 2022 - 2023",
      text: "A recommender over 180K+ rows: ETL into a normalized SQL schema, genre and weighted-tag similarity.",
      link: "https://github.com/AKSHAYKUMARDHAR/Similar-Movies-Retrieval" }
  ],

  about: [
    "I build AI products that turn messy financial data into something people can trust and act on, and I own them end to end: framing the problem, designing the evaluation, shipping to production and iterating after launch.",
    "My background is data and ML: an MSc in Data Analytics from Queen's University Belfast, then 3+ years across edtech (BYJU'S), marketing analytics (JamBird), institutional credit (9fin) and ESG analytics (Catalysk). Along the way my work moved from analysis to owning AI systems in production, and to the product calls that come with them: what \"good\" means, when the model should abstain, and which model to ship.",
    "I build with Claude Code and Cursor and write the Python and SQL myself, so I can take an idea to a working, measured prototype before asking a team to commit to it."
  ],

  principles: [
    { title: "Write the eval before the feature", text: "A golden set plus a held-out set of hard, unseen cases is the spec and the release bar." },
    { title: "Measure precision on what the AI does alone", text: "Automation without precision just moves the work downstream." },
    { title: "Let the model abstain", text: "Confidence gates and a review queue keep people on the cases that need judgment, and their corrections become new labelled data." },
    { title: "A prompt is not a guardrail", text: "Capped tool calls, enforced schemas and input guards belong in v1." },
    { title: "Build tools non-engineers can run", text: "Config-driven rules and live dashboards let analysts change the system without waiting on engineering." }
  ],

  experience: [
    {
      title: "Data Consultant", company: "Catalysk", context: "AI sustainability analytics", dates: "Apr 2026 - Sep 2026", location: "Bengaluru, India",
      summary: "Owned the AI transaction categorization engine behind client ESG reporting, from design through production.",
      caseStudy: "case-studies/catalysk.html",
      bullets: [
        "Architected and led the build of a multi-stage categorization engine with a small team: rules, merchant extraction, an SBERT semantic fallback and an evaluation harness",
        "Cut uncategorized transactions from 39% to 13% by redesigning UPI (VPA) and P2P categorization logic",
        "Lifted category accuracy 5 points with an embedding bake-off (MiniLM, E5, BGE), rejecting a slower model that only looked better on paper",
        "Gated auto-categorization at ~84% confidence, routing uncertain rows to human review",
        "Defined the release bar: a 388-row UAT golden set and a 1,400-row benchmark across 7 bank statements",
        "Grew coverage from 21 to 36 categories (10K to 17K training examples) with zero golden-set regression",
        "Cut processing from hours to minutes per 1,000 rows with zero change to output",
        "Shipped 90+ automated data quality checks across 5 financial schemas",
        "Cut banking partner onboarding from days to hours with a config-driven YAML framework",
        "Launched an 18-table PostgreSQL observability layer with live Metabase dashboards"
      ]
    },
    {
      title: "Senior Data Associate", company: "9fin", context: "Institutional financial technology platform", dates: "Jan 2025 - Sep 2025", location: "Belfast, UK",
      summary: "Owned a production ML market-news crawler and shipped an LLM into production automation.",
      bullets: [
        "Delivered £390K in annual cost savings and 32% faster client delivery by owning a production ML market-news crawler: resolving incidents and adding verification controls",
        "Accelerated client onboarding by 15% by shipping the Gemini API into production automation for post-acquisition schema alignment, with prompts I wrote myself",
        "Mentored 15 analysts on data quality standards, verification workflows and tooling",
        "Ran SQL analysis across 140+ global credit instruments for portfolio monitoring"
      ]
    },
    {
      title: "Data Associate", company: "9fin", context: "Institutional financial technology platform", dates: "May 2024 - Dec 2024", location: "Belfast, UK",
      summary: "Kept institutional credit data accurate and visible.",
      bullets: [
        "Maintained 100% data accuracy against delivery SLAs across 140+ institutional credit instruments",
        "Built real-time KPI and incident dashboards across Power BI and Notion for product, engineering and non-technical stakeholders"
      ]
    },
    {
      title: "Data Science Intern", company: "JamBird Marketing", context: "Marketing analytics", dates: "Jun 2023 - Sep 2023", location: "Belfast, UK",
      summary: "Replaced a manual review process with an NLP model.",
      bullets: [
        "Deployed an NLP text classification model at 87% accuracy that automated insight generation and replaced a manual review process",
        "Engineered features across 3M+ data points and presented findings to senior stakeholders as an actionable marketing strategy"
      ]
    },
    {
      title: "Data Analyst", company: "BYJU'S", context: "Edtech", dates: "Aug 2020 - Jul 2021", location: "India",
      summary: "Faster pipelines and ML-based learning paths.",
      bullets: [
        "Optimised PySpark ETL pipelines, cutting data processing time by 20%",
        "Implemented ML-based learning-path recommendations, improving student segmentation accuracy by 15%"
      ]
    }
  ],

  skills: [
    { group: "AI product", items: [
      ["Evaluation design: golden sets, held-out sets, release bars", "Catalysk, UPI agent, scam checker"],
      ["Confidence gating and human-in-the-loop", "Catalysk, UPI agent"],
      ["Abstention design: three-way verdicts, self-consistency", "Scam checker"],
      ["Model selection by bake-off", "Catalysk"],
      ["Agent guardrails and prompt-injection testing", "UPI agent, scam checker"],
      ["Prompt design", "9fin, UPI agent, scam checker"],
      ["PRDs and success metrics", "UPI agent, scam checker"],
      ["A/B test design with power analysis", "Scam checker"]
    ] },
    { group: "AI and ML", items: [
      ["LLM agents and tool calling", "UPI agent"],
      ["MCP", "UPI agent"],
      ["RAG on pgvector", "UPI agent"],
      ["SBERT / sentence-transformers: MiniLM, E5, BGE", "Catalysk"],
      ["NLP text classification", "JamBird, Catalysk"],
      ["Multilingual NLP: Hindi, Bengali and romanised text", "Scam checker"],
      ["Time-series forecasting: ARIMA, LSTM, VAR, STL", "Energia, stock pipeline"],
      ["K-means, Random Forest", "Energia"]
    ] },
    { group: "Build", items: [
      ["Python (Pandas)", "all roles"],
      ["SQL / PostgreSQL", "Catalysk, 9fin"],
      ["PySpark", "BYJU'S"],
      ["FastAPI", "UPI agent, scam checker"],
      ["n8n", "UPI agent"],
      ["YAML config-driven pipelines", "Catalysk"],
      ["Git / GitHub", "all projects"]
    ] },
    { group: "AI tools", items: [
      ["Claude Code", "UPI agent, scam checker and daily build work"],
      ["Cursor", "build work"],
      ["Gemini API", "9fin, UPI agent, scam checker"],
      ["Anthropic API", "UPI agent"]
    ] },
    { group: "Data and BI", items: [
      ["Metabase", "Catalysk, 9fin"],
      ["Power BI", "9fin, Energia"],
      ["Tableau", "Energia"],
      ["Notion", "9fin"],
      ["Data quality engineering, 90+ checks", "Catalysk"]
    ] },
    { group: "Domains", items: [
      ["Fintech: UPI/VPA, bank transactions, institutional credit", "Catalysk, 9fin, UPI agent"],
      ["Fraud and scam prevention in India", "Scam checker"],
      ["ESG and sustainability", "Catalysk"],
      ["Energy", "Energia"],
      ["Edtech", "BYJU'S"]
    ] }
  ],

  education: [
    { degree: "MSc Data Analytics", school: "Queen's University Belfast, UK", dates: "2022 - 2023", note: "Machine learning, forecasting and data analytics; industry projects with Energia Group" },
    { degree: "BSc Computer Science", school: "Assam University, Silchar, India", dates: "2017 - 2020", note: "" }
  ],
  certifications: [
    "Oracle Cloud Infrastructure AI Foundations Associate (Oracle)",
    "Google Data Analytics Professional Certificate (Google)",
    "BCG GenAI Job Simulation (Forage)",
    "BCG Data Science Job Simulation (Forage)"
  ],
  awards: ["Best Project, Irish Intervarsity (2023)"],
  languages: ["English (full professional)", "Hindi (native)", "Assamese (native)", "Bengali (native)"],

  contact: {
    line: "Hiring for an AI product role? I'd like to hear about the problem you're solving."
  }
};
