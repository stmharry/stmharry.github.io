import type { SiteContent } from "./types";

export const siteContent: SiteContent = {
  profile: {
    name: "Tzu-Ming Harry Hsu",
    headline: "Founder and CTO, Hashgreen Labs",
    location: "Taipei and Boston",
    bio: "PhD in Computer Science from MIT. I work at the intersection of machine learning, computer vision, and practical systems for healthcare and real-world deployment.",
  },
  links: [
    {
      label: "Email",
      href: "mailto:stmharry@mit.edu",
      description: "stmharry@mit.edu",
    },
    {
      label: "GitHub",
      href: "https://github.com/stmharry",
      description: "@stmharry",
    },
    {
      label: "Google Scholar",
      href: "https://scholar.google.com.tw/citations?user=dLAxLwUAAAAJ",
      description: "Publication list and citations",
    },
  ],
  topics: [
    { slug: "medical-ai", label: "Medical AI" },
    { slug: "federated-learning", label: "Federated Learning" },
    { slug: "computer-vision", label: "Computer Vision" },
    { slug: "ml-systems", label: "ML Systems" },
  ],
  experience: [
    {
      id: "hashgreen",
      organization: "Hashgreen Labs",
      role: "Founder and CTO",
      startYear: 2022,
      endYear: null,
      description:
        "Leading product and engineering strategy across AI-driven initiatives and platform development.",
      tags: ["product", "leadership", "ai"],
      links: [],
    },
    {
      id: "mit-phd",
      organization: "Massachusetts Institute of Technology",
      role: "PhD in Electrical Engineering and Computer Science",
      startYear: 2017,
      endYear: 2022,
      description:
        "Research in machine learning for healthcare, multimodal learning, and robust model development.",
      tags: ["research", "healthcare", "ml"],
      links: [],
    },
  ],
  publications: [
    {
      id: "fedvc-eccv-2020",
      title: "Federated Visual Classification with Real-World Data Distribution",
      year: 2020,
      venue: "ECCV 2020",
      authors: "Tzu-Ming Harry Hsu, Hang Qi, Matthew Brown",
      description:
        "A practical treatment of federated vision classification under non-IID real-world data settings.",
      href: "https://arxiv.org/abs/2003.08082",
      topics: ["federated-learning", "computer-vision"],
      featured: true,
      order: 1,
    },
    {
      id: "deepopg-miccai-2021",
      title: "DeepOPG: Improving Orthopantomogram Finding Summarization with Weak Supervision",
      year: 2021,
      venue: "MICCAI 2021",
      authors: "Tzu-Ming Harry Hsu, Yin-Chih Chelsea Wang",
      description:
        "Weakly supervised summarization for dental radiograph findings to better support clinical workflows.",
      href: "https://arxiv.org/abs/2103.08290",
      topics: ["medical-ai", "computer-vision"],
      featured: true,
      order: 2,
    },
    {
      id: "ccr-mlhc-2019",
      title: "Clinically Accurate Chest X-Ray Report Generation",
      year: 2019,
      venue: "MLHC 2019",
      authors:
        "Tzu-Ming Harry Hsu, Guanxiong Liu, Matthew McDermott, Willie Boag, Wei-Hung Weng, Peter Szolovits, Marzyeh Ghassemi",
      description:
        "Methods for generating chest X-ray reports with stronger alignment to clinical correctness.",
      href: "https://arxiv.org/abs/1904.02633",
      topics: ["medical-ai", "ml-systems"],
      featured: true,
      order: 3,
    },
    {
      id: "fedavgm-neurips-workshop-2019",
      title: "Measuring the Effects of Non-Identical Data Distribution for Federated Visual Classification",
      year: 2019,
      venue: "NeurIPS FL Workshop 2019",
      authors: "Tzu-Ming Harry Hsu, Hang Qi, Matthew Brown",
      description:
        "Empirical analysis of optimization and generalization when federated clients follow skewed data distributions.",
      href: "https://arxiv.org/abs/1909.06335",
      topics: ["federated-learning", "ml-systems"],
      featured: true,
      order: 4,
    },
    {
      id: "3dsdn-neurips-2018",
      title: "3D-Aware Scene Manipulation via Inverse Graphics",
      year: 2018,
      venue: "NeurIPS 2018",
      authors:
        "Tzu-Ming Harry Hsu, Shunyu Yao, Jun-Yan Zhu, Jiajun Wu, Antonio Torralba, William T. Freeman, Joshua B. Tenenbaum",
      description:
        "Inverse graphics approach for scene understanding and controllable manipulation in 3D-aware pipelines.",
      href: "https://arxiv.org/abs/1808.09351",
      topics: ["computer-vision", "ml-systems"],
      featured: true,
      order: 5,
    },
    {
      id: "body-composition-ejr-2021",
      title: "Artificial Intelligence to Assess Body Composition on Routine Abdominal CT Scans and Predict Mortality in Pancreatic Cancer",
      year: 2021,
      venue: "European Journal of Radiology",
      authors:
        "Tzu-Ming Harry Hsu, Khoschy Schawkat, Seth J. Berkowitz, Jesse L. Wei, Alina Makoyeva, Kaila Legare, Corinne DeCicco, S. Nicolas Paez, Jim S.H. Wu, Peter Szolovits, Ron Kikinis, Arthur J. Moser, Alexander Goehler",
      description:
        "AI pipeline for body composition measurement and mortality prediction from routine abdominal CT scans.",
      href: "https://www.ejradiology.com/article/S0720-048X(21)00315-6/fulltext",
      topics: ["medical-ai"],
      featured: false,
      order: 6,
    },
  ],
  seo: {
    title: "Tzu-Ming Harry Hsu",
    description:
      "Founder and CTO at Hashgreen Labs. MIT PhD. Research and engineering across machine learning, healthcare AI, and computer vision.",
    siteUrl: "https://stmharry.github.io",
    image: "https://stmharry.github.io/og-image.jpg",
  },
};
