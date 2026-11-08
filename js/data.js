var RED = '#dc2626';
var PORTFOLIO = {
  projects: {
    label: 'Projects', color: RED,
    children: [
      { id: 'p1', label: 'SkinSure',
        route: 'projects/skinsure.html'
      },
      { id: 'p2', label: 'CHAKRA',
        route: 'projects/chakra.html'
      },
      { id: 'p3', label: 'VidyaAI',
        route: 'projects/vidyaai.html'
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
