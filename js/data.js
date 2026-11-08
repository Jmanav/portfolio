var RED = '#dc2626';
var PORTFOLIO = {
  projects: {
    label: 'Projects', color: RED,
    children: [
      { id: 'p1', label: 'SkinSure',
        route: '#/projects/skinsure'
      },
      { id: 'p2', label: 'CHAKRA',
        detail: {
          label: 'Project', title: 'CHAKRA — Critical Infra Risk Engine', color: RED,
          body: '<p>A risk-scoring platform for Indian smart-city critical infrastructure (power, water, health, telecom, traffic). Given a synthetic 90-asset city, it computes which compromised asset would do the most damage, runs a 24h cascading-failure simulation, ranks fixes by risk removed per hour of effort, and replays real ICS telemetry (HAI, MSU/ORNL) through trained models to move live risk scores.</p>'
              + '<p>A pure-Python Monte Carlo risk engine (test-oracle validated, zero ML imports by architectural rule) is fed likelihood ratios from three independently gated models — IsolationForest anomaly detection, a RandomForest attack-vs-fault classifier, and an XGBoost CVE-exploitability model — each only used if it clears a precommitted held-out metric gate. Every number the API returns carries a provenance badge (FEED / MODEL / GRAPH / ASSUMPTION / SYNTHETIC), enforced by a middleware test so no unbadged number can leave the system — the project is structurally incapable of showing a fabricated or LLM-hallucinated number as data. An optional LLM narrates results but never computes them; any number it states that isn\'t in the source facts is stripped before display.</p>'
              + '<p>Shipped as a single offline-capable Docker container (boots and serves with <code>--network none</code>) with a React/TypeScript dashboard, FastAPI backend, and CI enforcing architecture boundaries, mypy --strict, and determinism on every commit.</p>'
              + '<p><a href="https://dvd1906-cityrisk.hf.space" target="_blank" rel="noopener noreferrer">Live demo &rarr;</a></p>',
          tags: ['FastAPI', 'Monte Carlo Simulation', 'XGBoost / scikit-learn', 'React + TypeScript', 'Docker']
        }
      },
      { id: 'p3', label: 'VidyaAI',
        detail: { label: 'Project', title: '[YOUR PROJECT NAME]', color: RED,
          body: '<p>[YOUR PROJECT DESCRIPTION]</p>', tags: ['[TAG 1]', '[TAG 2]', '[TAG 3]'] }
      }
    ]
  },
  research: {
    label: 'Research', color: RED,
    children: [
      { id: 'r1', label: 'Paper I',
        detail: { label: 'Research Paper', title: '[YOUR PAPER TITLE]', color: RED,
          body: '<p><strong>First Author</strong></p><p>[ABSTRACT / SUMMARY]</p><p>[PUBLICATION VENUE]</p>',
          tags: ['[FIELD]', '[METHOD]', 'First Author'] }
      },
      { id: 'r2', label: 'Paper II',
        detail: { label: 'Research Paper', title: '[YOUR PAPER TITLE]', color: RED,
          body: '<p><strong>First Author</strong></p><p>[ABSTRACT / SUMMARY]</p>', tags: ['[FIELD]', 'First Author'] }
      },
      { id: 'r3', label: 'Paper III',
        detail: { label: 'Research Paper', title: '[YOUR PAPER TITLE]', color: RED,
          body: '<p><strong>First Author</strong></p><p>[ABSTRACT / SUMMARY]</p>', tags: ['[FIELD]', 'First Author'] }
      }
    ]
  },
  about: {
    label: 'About', color: RED,
    children: [
      { id: 'a1', label: 'Ambition',
        detail: { label: 'About Me', title: "Where I'm Headed", color: RED,
          body: '<p>[YOUR AMBITION]</p><p>[YOUR VISION]</p>',
          tags: ['AI/ML', 'MS Fall 2028', 'Builder'] }
      },
      { id: 'a2', label: 'Currently',
        detail: { label: 'About Me', title: "What I'm Working On", color: RED,
          body: '<p><strong>B.Tech IT, DJ Sanghvi College of Engineering</strong> — CGPA 8.7</p><p>Following Karpathy\'s Zero to Hero. Practicing DSA daily. Building agents and breaking them.</p>',
          tags: ['3rd Year', 'DJSCE', 'Neural Networks'] }
      },
      { id: 'a3', label: 'Leadership',
        detail: { label: 'About Me', title: 'Beyond Code', color: RED,
          body: '<p><strong>Google Developers Group</strong> — ML Research Co-Committee</p><p><strong>MUNSOC</strong> — Delegation Affairs</p><p>Beach cleanups, traffic signal analysis, blood donation drives.</p>',
          tags: ['GDG', 'MUNSOC', 'Community'] }
      }
    ]
  },
  experience: {
    label: 'Experience', color: RED,
    children: [
      { id: 'e1', label: 'Internship I',
        detail: { label: 'Experience', title: '[YOUR INTERNSHIP TITLE]', color: RED,
          body: '<p><strong>[COMPANY NAME]</strong> — [ROLE]</p><p>[WHAT YOU DID]</p>', tags: ['[TECH]', '[DOMAIN]'] }
      },
      { id: 'e2', label: 'Internship II',
        detail: { label: 'Experience', title: '[YOUR INTERNSHIP TITLE]', color: RED,
          body: '<p><strong>[COMPANY NAME]</strong> — [ROLE]</p><p>[WHAT YOU DID]</p>', tags: ['[TECH]', '[DOMAIN]'] }
      }
    ]
  },
  skills: {
    label: 'Skills', color: RED,
    children: [
      { id: 's1', label: 'Skills',
        detail: { label: 'Skills', title: 'Technical Skills', color: RED,
          body: '<p><strong>Languages</strong></p>'
              + '<p class="tag-row">' + ['Python','Java','SQL','C++','C'].map(function(t){ return '<span class="tag">' + t + '</span>'; }).join('') + '</p>'
              + '<p><strong>Machine Learning / Deep Learning</strong></p>'
              + '<p class="tag-row">' + ['PyTorch','TensorFlow/Keras','scikit-learn','HuggingFace','Computer Vision','NLP','Transformers'].map(function(t){ return '<span class="tag">' + t + '</span>'; }).join('') + '</p>'
              + '<p><strong>LLM / Generative AI</strong></p>'
              + '<p class="tag-row">' + ['RAG','Fine-tuning','LoRA','QLoRA','LLM Evaluation','Agentic AI','Multi-Agent Systems','Model Context Protocol','Multimodal Models','Guardrails and Safety'].map(function(t){ return '<span class="tag">' + t + '</span>'; }).join('') + '</p>'
              + '<p><strong>Frameworks and Libraries</strong></p>'
              + '<p class="tag-row">' + ['LangChain','LangGraph','LangFuse','LangSmith','FastAPI','Streamlit','Pydantic','SHAP','Grad-CAM'].map(function(t){ return '<span class="tag">' + t + '</span>'; }).join('') + '</p>'
              + '<p><strong>Vector Databases &amp; Data</strong></p>'
              + '<p class="tag-row">' + ['Pinecone','ChromaDB','FAISS','PostgreSQL','Pandas','NumPy'].map(function(t){ return '<span class="tag">' + t + '</span>'; }).join('') + '</p>'
              + '<p><strong>Deployment</strong></p>'
              + '<p class="tag-row">' + ['Docker'].map(function(t){ return '<span class="tag">' + t + '</span>'; }).join('') + '</p>'
              + '<p><strong>Cloud Platforms</strong></p>'
              + '<p class="tag-row">' + ['AWS (SageMaker, S3, Bedrock)','GCP (Vertex AI)','Azure'].map(function(t){ return '<span class="tag">' + t + '</span>'; }).join('') + '</p>'
              + '<p><strong>Developer Tools &amp; Practices</strong></p>'
              + '<p class="tag-row">' + ['Git/GitHub','Testing (pytest)','Observability (logging, tracing, monitoring)'].map(function(t){ return '<span class="tag">' + t + '</span>'; }).join('') + '</p>',
          tags: []
        }
      }
    ]
  }
};
