import type { ResumeTargetOverlay } from "./types";

export const resumeTargetOverlays: ResumeTargetOverlay[] = [
  {
    id: "bigtech-ml-infra",
    company: "Bridge Track",
    roleFamily: "Large-Company ML Infra / Applied ML",
    baseVariant: "applied",
    fitThesis:
      "Position Harry as a legible big-tech ML infra and applied-ML hire by leading with Google-scale systems, production ML, and measurable data and deployment wins.",
    keywordBank: ["ml infrastructure", "applied machine learning", "data systems", "throughput", "deployment", "production ai"],
    profile: {
      headline: "Machine learning infrastructure and applied ML engineer for large-scale production systems",
      summaryBullets: [
        "MIT-trained ML researcher-engineer with 10+ years across computer vision, federated learning, sensing, and production AI systems.",
        "Built large-scale experimentation infrastructure at Google spanning 1,000+ GPUs and 1M+ machine hours, plus startup ML/data systems that moved models into production.",
        "Recent work includes 10 TB data operations, labeling loops, deployment automation, throughput gains, and cost-aware ML platform improvements.",
        "Targeting senior ML infra, applied ML, and research-engineering roles where scale, reliability, and experiment velocity matter immediately.",
      ],
    },
    experience: {
      "google-student-researcher": {
        order: 1,
        summary:
          "Built large-scale ML experimentation infrastructure spanning 1,000+ GPUs and 1M+ machine hours while publishing research and open-sourcing tooling for broad adoption.",
      },
      dentscape: {
        order: 2,
        summary:
          "Led ML platform, data, and deployment upgrades for AI-assisted dental design, improving data access, labeling turnaround, serving throughput, and infrastructure efficiency.",
      },
      "hashgreen-labs": {
        order: 3,
        summary:
          "Built and led a 20-person engineering organization, shipping client-facing data systems while establishing hiring, delivery, and execution cadence from zero.",
      },
      "mit-ra": { order: 4 },
    },
    publications: {
      "fedvc-2020": { order: 1 },
      "fedavgm-2019": { order: 2 },
      "chexpertpp-2020": { order: 3 },
      "dental-multinational-2025": { order: 4 },
    },
  },
  {
    id: "bigtech-research-engineer",
    company: "Bridge Track",
    roleFamily: "Large-Company Research Engineer / Applied Scientist",
    baseVariant: "research",
    fitThesis:
      "Position Harry as a research engineer with strong publication depth, scalable systems experience, and enough product execution to fit large-company applied research teams.",
    keywordBank: ["research engineer", "applied scientist", "computer vision", "multimodal", "scalable systems", "evaluation"],
    profile: {
      headline: "Research engineer in computer vision, multimodal learning, and scalable ML systems",
      summaryBullets: [
        "MIT-trained researcher with 20+ publications, patents, and theses across computer vision, federated learning, sensing, and deployable ML.",
        "Built large-scale experimentation infrastructure at Google spanning 1,000+ GPUs and 1M+ machine hours, with open-source tooling and datasets.",
        "Recent production work adds strong data, evaluation, and deployment credibility to a research-heavy background.",
        "Targeting research-engineer and applied-scientist roles where modeling, systems, and real-world constraints all matter.",
      ],
    },
    experience: {
      "mit-ra": { order: 1 },
      "google-student-researcher": { order: 2 },
      dentscape: { order: 3 },
      "academia-sinica-student-researcher": { order: 4 },
    },
    publications: {
      "fedvc-2020": { order: 1 },
      "3d-aware-2018": { order: 2 },
      "deepopg-2021": { order: 3 },
      "transfer-neural-trees-tip-2019": { order: 4 },
      "dental-multinational-2025": { order: 5 },
      "fedavgm-2019": { order: 6 },
    },
  },
  {
    id: "healthcare-ai-multimodal",
    company: "Bridge Track",
    roleFamily: "Healthcare / Medical Imaging / Multimodal AI",
    baseVariant: "applied",
    fitThesis:
      "Position Harry as a senior applied-ML hire for healthcare and multimodal AI by leading with medical publications, hospital workflow experience, and recent production ML deployment.",
    keywordBank: ["healthcare ai", "medical imaging", "multimodal", "applied ml", "real-world deployment", "clinical workflows"],
    profile: {
      headline: "Applied ML engineer for healthcare AI, medical imaging, and multimodal production systems",
      summaryBullets: [
        "MIT-trained ML researcher-engineer with deep medical-AI, computer-vision, and constrained-data experience plus recent production deployment work.",
        "Published extensively in medical imaging and healthcare ML, collaborated with hospitals and industry partners, and deployed models into real workflows.",
        "Recent work adds strong product, data, labeling, and deployment signal through AI-assisted dental design and production ML systems.",
        "Targeting senior healthcare-AI and multimodal ML roles where research depth and delivery both matter.",
      ],
    },
    experience: {
      dentscape: { order: 1 },
      "mit-ra": { order: 2 },
      "bidmc-research-trainee": { order: 3 },
      "bwh-research-trainee": { order: 4 },
    },
    publications: {
      "dental-multinational-2025": { order: 1 },
      "intraoral-bmc-2023": { order: 2 },
      "deepopg-2021": { order: 3 },
      "body-composition-2021": { order: 4 },
      "liver-mri-2020": { order: 5 },
      "cxr-baselines-2020": { order: 6 },
    },
  },
  {
    id: "robotics-platform-simulation",
    company: "Bridge Track",
    roleFamily: "Robotics Platform / Simulation / Perception",
    baseVariant: "applied",
    fitThesis:
      "Position Harry as a robotics-adjacent platform and simulation candidate by leading with scalable systems, 3D/perception depth, and product-grade ML execution.",
    keywordBank: ["simulation", "robotics platform", "perception", "ml platform", "data engine", "3d vision"],
    profile: {
      headline: "ML platform and simulation engineer for robotics, perception, and data systems",
      summaryBullets: [
        "MIT-trained ML researcher-engineer with experience spanning 3D vision, federated learning, sensing, and production AI systems.",
        "Built Google-scale experimentation infrastructure and recent startup ML/data/deployment systems that connect research ideas to shipped products.",
        "Research in 3D scene understanding, wireless sensing, and deployable vision systems transfers naturally into simulation, perception, and robotics-platform roles.",
        "Targeting robotics-adjacent platform, simulation, and perception roles as a bridge into physical AI.",
      ],
    },
    experience: {
      "google-student-researcher": { order: 1 },
      dentscape: { order: 2 },
      "mit-ra": { order: 3 },
      "digital-drift": { order: 4 },
    },
    publications: {
      "3d-aware-2018": { order: 1 },
      "fedvc-2020": { order: 2 },
      "wireless-stickers-2018": { order: 3 },
      "deepopg-2021": { order: 4 },
      "dental-multinational-2025": { order: 5 },
    },
  },
  {
    id: "pi-research",
    company: "Physical Intelligence",
    roleFamily: "Research Scientist",
    baseVariant: "research",
    fitThesis:
      "Position Harry as a research scientist who can bridge large-scale ML systems, 3D perception, and real-world data loops for generalist robot policies.",
    keywordBank: ["embodied ai", "robot learning", "foundation models", "vla", "real-world data", "evaluation"],
    profile: {
      headline: "Research scientist for embodied foundation models and robot learning systems",
      summaryBullets: [
        "MIT-trained researcher with 20+ publications across computer vision, federated learning, sensing, and deployable ML under real-world data constraints.",
        "Built large-scale experimentation infrastructure at Google spanning 1,000+ GPUs and 1M+ machine hours, with open-source releases and research adopted broadly.",
        "Recent work combines data engines, preference modeling, and production ML systems for geometry-rich products, aligned with embodied AI and robot evaluation loops.",
        "Targeting Physical Intelligence roles that connect generalist robot policies, model/data infrastructure, and real-world deployment judgment.",
      ],
    },
    experience: {
      "google-student-researcher": {
        order: 1,
        summary:
          "Built large-scale ML experimentation infrastructure and published deep federated-learning research, giving a strong base for high-throughput training, evaluation, and model iteration in embodied AI.",
        highlights: [
          {
            text: "Developed scalable experimentation infrastructure spanning thousands of machines, 1,000+ GPUs, and 1M+ machine hours.",
          },
          {
            text: "Published two peer-reviewed papers in deep federated learning and released open-source datasets and tooling for broader adoption.",
          },
          {
            text: "Worked on research problems where data distribution shift, evaluation rigor, and systems throughput all mattered simultaneously.",
          },
        ],
      },
      "mit-ra": {
        order: 2,
        summary:
          "Led research on deployable medical AI and 3D computer vision under constrained-data settings, connecting model design to evaluation and operational realism.",
        highlights: [
          {
            text: "Produced 20+ publications, patents, and theses while collaborating with Google, Takeda, and hospital partners on deployable ML systems.",
          },
          {
            text: "Worked across 3D vision, multimodal learning, and data-constrained modeling, relevant to robot perception and embodied-world reasoning.",
          },
          {
            text: "Built a track record of converting frontier ML ideas into workflows that could survive operational constraints and external stakeholders.",
          },
        ],
      },
      dentscape: {
        order: 3,
        summary:
          "Built data, training, and evaluation systems for AI-assisted 3D dental design, combining geometric ML, pre-labeling loops, and preference modeling to accelerate iteration.",
        highlights: [
          {
            text: "Reorganized a fragmented ~10 TB dataset into a standardized ~4 TB ML-ready registry, reducing access time from ~3 days to minutes.",
          },
          {
            text: "Rebuilt pre-labeling and labeling loops, cutting turnaround from ~4 weeks to ~1 week and improving experiment velocity.",
          },
          {
            text: "Implemented bilevel/meta-learning for personalized generation and improved preference fit by ~20% in a production-facing system.",
          },
        ],
      },
    },
    publications: {
      "3d-aware-2018": { order: 1 },
      "fedvc-2020": { order: 2 },
      "deepopg-2021": { order: 3 },
      "wireless-stickers-2018": { order: 4 },
      "fedavgm-2019": { order: 5 },
      "transfer-neural-trees-tip-2019": { order: 6 },
    },
  },
  {
    id: "pi-infra",
    company: "Physical Intelligence",
    roleFamily: "ML Infra Engineer",
    baseVariant: "applied",
    fitThesis:
      "Position Harry as an ML infra builder who can improve robot-data throughput, experiment velocity, and deployment quality for embodied foundation-model teams.",
    keywordBank: ["ml infra", "data engine", "training infra", "evaluation", "deployment", "throughput"],
    profile: {
      headline: "ML infra builder for embodied AI data, training, and evaluation systems",
      summaryBullets: [
        "MIT-trained ML researcher-engineer with 10+ years across computer vision, federated learning, sensing, and production AI systems.",
        "Built data registries, labeling loops, deployment pipelines, and large-scale experimentation infrastructure from research prototypes to production systems.",
        "Recent work spans 10 TB data operations, pre-labeling pipelines, throughput optimization, and cost-aware ML deployment for geometry-rich AI products.",
        "Targeting Physical Intelligence infra roles where data engines, experiment velocity, and evaluation rigor are product-critical.",
      ],
    },
    experience: {
      dentscape: {
        order: 1,
        highlights: [
          {
            text: "Reorganized a fragmented ~10 TB dataset into a standardized ~4 TB ML-ready registry, reducing raw-data access from ~3 days to minutes.",
          },
          {
            text: "Rebuilt labeling and pre-labeling workflows end-to-end, cutting 100-200 case batch turnaround from ~4 weeks to ~1 week with clear audit trails.",
          },
          {
            text: "Standardized deployment with modern packaging, private registry support, and GitHub Actions; deploys moved from manual half-day ops to single-push workflows.",
          },
          {
            text: "Improved backend throughput by ~110% and cut infrastructure cost by ~50% through stack and serving changes.",
          },
        ],
      },
      "google-student-researcher": {
        order: 2,
      },
      "hashgreen-labs": {
        order: 3,
        summary:
          "Built a 20-person engineering organization and shipped client-facing data systems from zero, creating hiring, delivery, and execution cadence in a high-ambiguity startup setting.",
      },
    },
    publications: {
      "dental-multinational-2025": { order: 1 },
      "fedvc-2020": { order: 2 },
      "deepopg-2021": { order: 3 },
      "wireless-stickers-2018": { order: 4 },
    },
  },
  {
    id: "pi-robotics-software",
    company: "Physical Intelligence",
    roleFamily: "Robotics Software Engineer",
    baseVariant: "applied",
    fitThesis:
      "Position Harry as a research-to-product engineer who can connect ML systems, data loops, and deployment rigor in robot-facing software.",
    keywordBank: ["robotics software", "deployment", "data loops", "evaluation", "backend", "observability"],
    profile: {
      headline: "Research-to-product engineer for embodied AI deployment and robotics software",
    },
    experience: {
      dentscape: { order: 1 },
      "google-software-engineer-intern": {
        order: 2,
        summary:
          "Contributed production software and experimentation tooling that improved reliability and iteration speed for applied machine learning workflows.",
      },
      "digital-drift": {
        order: 3,
        summary:
          "Built and deployed deep-learning systems and backend APIs that moved computer-vision features from experimentation into production mobile experiences.",
      },
    },
    publications: {
      "dental-multinational-2025": { order: 1 },
      "deepopg-2021": { order: 2 },
      "3d-aware-2018": { order: 3 },
      "fedvc-2020": { order: 4 },
    },
  },
  {
    id: "figure-robot-learning",
    company: "Figure",
    roleFamily: "Helix AI Engineer, Robot Learning",
    baseVariant: "research",
    fitThesis:
      "Position Harry as a fast-moving research engineer who can bridge robot-learning fundamentals, evaluation rigor, and product-speed iteration.",
    keywordBank: ["robot learning", "helix", "vla", "data loops", "world models", "deployment"],
    profile: {
      headline: "Research engineer for robot learning, VLA systems, and fast deployment loops",
    },
    experience: {
      "google-student-researcher": { order: 1 },
      dentscape: { order: 2 },
      "mit-ra": {
        order: 3,
        highlights: [
          {
            text: "Produced 20+ publications, patents, and theses spanning deployable ML, 3D vision, and learning under constrained-data settings.",
          },
          {
            text: "Worked with translational partners to move models toward real workflows, building judgment around measurement and operational relevance.",
          },
          {
            text: "Built research habits that balance modeling ambition against data, eval, and deployment constraints.",
          },
        ],
      },
    },
    publications: {
      "3d-aware-2018": { order: 1 },
      "fedvc-2020": { order: 2 },
      "deepopg-2021": { order: 3 },
      "wireless-stickers-2018": { order: 4 },
      "fedavgm-2019": { order: 5 },
    },
  },
  {
    id: "figure-data-infra",
    company: "Figure",
    roleFamily: "AI Data Infrastructure Engineer",
    baseVariant: "applied",
    fitThesis:
      "Position Harry as a data-infra lead who can build robot-data registries, labeling loops, and experiment-support systems under aggressive product timelines.",
    keywordBank: ["data infrastructure", "labeling", "data registry", "throughput", "evaluation", "helix"],
    profile: {
      headline: "AI data infrastructure builder for robot-data engines and evaluation loops",
      summaryBullets: [
        "MIT-trained ML researcher-engineer with 10+ years across computer vision, federated learning, sensing, and production AI systems.",
        "Built data registries, labeling loops, deployment pipelines, and large-scale experimentation infrastructure from research prototypes to production systems.",
        "Recent work includes a ~10 TB data reorganization, week-scale labeling turnaround reduction, and throughput-focused ML deployment improvements.",
        "Targeting Figure data-infrastructure roles where robot-data quality, experiment velocity, and real-world iteration speed matter together.",
      ],
    },
    experience: {
      dentscape: { order: 1 },
      "google-student-researcher": { order: 2 },
      "clarq-ai": {
        order: 3,
        summary:
          "Helped reposition Clarq from a hardware product into a force-intelligence platform with 100+ deployments, 15M+ force-time samples, and 150K labeled motion sets.",
        highlights: [
          {
            text: "Linked data strategy, hardware operations, and product roadmap into a long-term data/model moat story.",
          },
          {
            text: "Aligned product roadmap and data strategy across Taiwan hardware operations and US capital market expectations.",
          },
          {
            text: "Framed the operational flywheel from sensor data collection to model and product improvement.",
          },
        ],
      },
    },
    publications: {
      "dental-multinational-2025": { order: 1 },
      "deepopg-2021": { order: 2 },
      "fedvc-2020": { order: 3 },
      "wireless-stickers-2018": { order: 4 },
    },
  },
  {
    id: "figure-training-infra",
    company: "Figure",
    roleFamily: "AI Training Infrastructure Engineer",
    baseVariant: "applied",
    fitThesis:
      "Position Harry as a training-infra and experiment-ops builder who can connect large-scale compute, data loops, and production ML iteration.",
    keywordBank: ["training infrastructure", "large-scale experiments", "compute", "throughput", "evaluation", "helix"],
    profile: {
      headline: "Training-infrastructure engineer for embodied AI experiment velocity",
    },
    experience: {
      "google-student-researcher": { order: 1 },
      dentscape: { order: 2 },
      "mit-ra": { order: 3 },
    },
    publications: {
      "fedvc-2020": { order: 1 },
      "fedavgm-2019": { order: 2 },
      "chexpertpp-2020": { order: 3 },
      "dental-multinational-2025": { order: 4 },
    },
  },
  {
    id: "apptronik-rl",
    company: "Apptronik",
    roleFamily: "Reinforcement Learning Engineer",
    baseVariant: "research",
    fitThesis:
      "Position Harry as a research engineer who understands learning systems, 3D perception, and evaluation under real-world constraints even when the past domain was not robotics.",
    keywordBank: ["reinforcement learning", "policy learning", "simulation", "evaluation", "3d perception", "humanoids"],
    profile: {
      headline: "Research engineer for robot learning, perception, and evaluation under real-world constraints",
    },
    experience: {
      "mit-ra": { order: 1 },
      "google-student-researcher": { order: 2 },
      dentscape: { order: 3 },
    },
    publications: {
      "3d-aware-2018": { order: 1 },
      "fedvc-2020": { order: 2 },
      "wireless-stickers-2018": { order: 3 },
      "deepopg-2021": { order: 4 },
      "transfer-neural-trees-tip-2019": { order: 5 },
    },
  },
  {
    id: "apptronik-perception",
    company: "Apptronik",
    roleFamily: "Senior Perception Learning Engineer",
    baseVariant: "applied",
    fitThesis:
      "Position Harry as a perception-heavy research-to-product engineer with 3D vision depth and recent production experience building data and evaluation loops.",
    keywordBank: ["perception", "3d vision", "segmentation", "geometry", "deployment", "eval"],
    profile: {
      headline: "Perception learning engineer for embodied AI and deployable 3D vision systems",
    },
    experience: {
      dentscape: { order: 1 },
      "mit-ra": { order: 2 },
      "google-student-researcher": { order: 3 },
    },
    publications: {
      "3d-aware-2018": { order: 1 },
      "deepopg-2021": { order: 2 },
      "dental-multinational-2025": { order: 3 },
      "intraoral-bmc-2023": { order: 4 },
      "fedvc-2020": { order: 5 },
    },
  },
  {
    id: "apptronik-systems",
    company: "Apptronik",
    roleFamily: "Senior Robotics Software & Integration Engineer",
    baseVariant: "applied",
    fitThesis:
      "Position Harry as a systems-minded builder who can own deployment, integration, and data-backed iteration in robot-adjacent products.",
    keywordBank: ["systems integration", "deployment", "robotics software", "observability", "backend", "ops"],
    profile: {
      headline: "Systems and deployment engineer for robotics software and ML-backed products",
    },
    experience: {
      dentscape: { order: 1 },
      "hashgreen-labs": { order: 2 },
      "digital-drift": { order: 3 },
      "google-software-engineer-intern": { order: 4 },
    },
    publications: {
      "dental-multinational-2025": { order: 1 },
      "deepopg-2021": { order: 2 },
      "wireless-stickers-2018": { order: 3 },
      "3d-aware-2018": { order: 4 },
    },
  },
  {
    id: "deepmind-research",
    company: "Google DeepMind",
    roleFamily: "Research Scientist / Research Engineer",
    baseVariant: "research",
    fitThesis:
      "Position Harry as a research scientist with clear publication depth, scalable systems experience, and evidence-based answers suitable for competency-driven interviews.",
    keywordBank: ["research scientist", "competency", "embodied ai", "evaluation", "3d vision", "data-driven impact"],
    profile: {
      headline: "Research scientist in embodied AI, computer vision, and scalable learning systems",
    },
    experience: {
      "mit-ra": { order: 1 },
      "google-student-researcher": { order: 2 },
      dentscape: { order: 3 },
    },
    publications: {
      "fedvc-2020": { order: 1 },
      "3d-aware-2018": { order: 2 },
      "deepopg-2021": { order: 3 },
      "fedavgm-2019": { order: 4 },
      "transfer-neural-trees-tip-2019": { order: 5 },
      "dental-multinational-2025": { order: 6 },
    },
  },
  {
    id: "nvidia-simulation",
    company: "NVIDIA",
    roleFamily: "Simulation / Robotics / ML Platform",
    baseVariant: "applied",
    fitThesis:
      "Position Harry as a simulation-aware platform engineer who can bridge research infrastructure, perception, and production-quality ML systems.",
    keywordBank: ["simulation", "platform", "isaac", "robotics", "training infra", "perception"],
    profile: {
      headline: "Simulation and ML platform engineer for robotics and embodied AI",
    },
    experience: {
      "google-student-researcher": { order: 1 },
      dentscape: { order: 2 },
      "mit-ra": { order: 3 },
      "digital-drift": { order: 4 },
    },
    publications: {
      "fedvc-2020": { order: 1 },
      "3d-aware-2018": { order: 2 },
      "wireless-stickers-2018": { order: 3 },
      "deepopg-2021": { order: 4 },
    },
  },
  {
    id: "intrinsic-platform",
    company: "Intrinsic",
    roleFamily: "Research Engineer / Robotics Platform ML",
    baseVariant: "applied",
    fitThesis:
      "Position Harry as a platform-oriented research engineer who can connect data, tooling, evaluation, and deployment for general robotics developers.",
    keywordBank: ["robotics platform", "tooling", "data engine", "evaluation", "developer infrastructure", "simulation"],
    profile: {
      headline: "Research-to-platform ML engineer for robotics data, tooling, and evaluation systems",
    },
    experience: {
      "google-student-researcher": { order: 1 },
      dentscape: { order: 2 },
      "hashgreen-labs": { order: 3 },
      "mit-ra": { order: 4 },
    },
    publications: {
      "fedvc-2020": { order: 1 },
      "3d-aware-2018": { order: 2 },
      "deepopg-2021": { order: 3 },
      "wireless-stickers-2018": { order: 4 },
      "dental-multinational-2025": { order: 5 },
    },
  },
];

export const resumeTargetOverlayById = Object.fromEntries(
  resumeTargetOverlays.map((overlay) => [overlay.id, overlay]),
) as Record<(typeof resumeTargetOverlays)[number]["id"], ResumeTargetOverlay>;
