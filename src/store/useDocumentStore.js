import { create } from 'zustand';

export const ROLES = {
  DO: 'DO',
  PO: 'PO',
  REV: 'REV',
  APP: 'APP',
  DCA: 'DCA',
  PA: 'PA',
  RM: 'RM',
  INTERNAL_AUDITOR: 'Internal Auditor',
  EXTERNAL_AUDITOR: 'External Auditor'
};

export const ROLE_LABELS = {
  [ROLES.DO]: 'DO (Document Owner)',
  [ROLES.PO]: 'PO (Process Owner)',
  [ROLES.REV]: 'REV (Technical Reviewer)',
  [ROLES.APP]: 'APP (Approver)',
  [ROLES.DCA]: 'DCA (Doc Control Admin)',
  [ROLES.PA]: 'PA (Platform Admin)',
  [ROLES.RM]: 'RM (Records Manager)',
  [ROLES.INTERNAL_AUDITOR]: 'Internal Auditor',
  [ROLES.EXTERNAL_AUDITOR]: 'External Auditor'
};

export const REGISTER_LABELS = {
  MDR: 'MDR (Master Doc Register)',
  CCR: 'CCR (Controlled Copies)',
  EDR: 'EDR (External Docs)',
  VAULT: 'Vault (Archive Records)'
};

export const DOC_TYPE_LABELS = {
  SOP: 'SOP (Standard Operating Procedure)',
  Policy: 'Policy',
  Form: 'Form',
  Manual: 'Manual',
  TRS: 'TRS (Tool Requirements)'
};

export const STATES = {
  S0: { code: 'S0', label: 'Draft', color: 'bg-slate-100 text-slate-600' },
  S1: { code: 'S1', label: 'Under Review', color: 'bg-blue-100 text-blue-600' },
  S2: { code: 'S2', label: 'Rework', color: 'bg-amber-100 text-amber-600' },
  S3: { code: 'S3', label: 'Under Approval', color: 'bg-indigo-100 text-indigo-600' },
  S4: { code: 'S4', label: 'Approved-Pending Release', color: 'bg-indigo-100 text-indigo-600' },
  S4_RM: { code: 'S4_RM', label: 'Pending RM Release', color: 'bg-orange-100 text-orange-600 shadow-sm border border-orange-200' },
  S5: { code: 'S5', label: 'Released', color: 'bg-emerald-100 text-emerald-600' },
  S6: { code: 'S6', label: 'Obsolete', color: 'bg-red-100 text-red-600' },
  S7: { code: 'S7', label: 'Archived', color: 'bg-gray-100 text-gray-600' }
};

const initialDocuments = [
  {
    id: "QM-001-v4.0",
    docNumber: "QM-001",
    name: "Quality Manual 2024",
    type: "Policy",
    status: "Released",
    stateCode: "S5",
    register: "MDR",
    owner: "Alex Morgan",
    version: "v4.0",
    updated: "2023-10-24T10:00:00Z",
    avatar: "AM",
    department: "Quality Assurance",
    description: "This Quality Manual describes the Quality Management System (QMS) established, implemented, and maintained by MS Enterprise.",
    content: "Full content of the quality manual goes here...",
    versionHistory: [
      { version: "v1.0", date: "2021-01-01T10:00:00Z", comment: "Initial Release" },
      { version: "v2.0", date: "2022-05-15T10:00:00Z", comment: "ISO 9001:2015 updates" },
      { version: "v4.0", date: "2023-10-24T10:00:00Z", comment: "Major revision for compliance" }
    ]
  },
  {
    id: "SOP-ENG-12-v2.1",
    docNumber: "SOP-ENG-12",
    name: "Equipment Calibration SOP",
    type: "SOP",
    status: "Under Review",
    stateCode: "S1",
    register: "MDR",
    owner: "James Reed",
    version: "v2.1",
    updated: "2023-12-12T14:30:00Z",
    avatar: "JR",
    department: "Engineering",
    description: "Standard operating procedure for periodic equipment calibration.",
    content: "Detailed calibration steps...",
    versionHistory: [
      { version: "v1.0", date: "2022-06-01T10:00:00Z", comment: "Initial Release" },
      { version: "v2.0", date: "2023-10-01T10:00:00Z", comment: "Revision" }
    ]
  },
  {
    id: "FRM-SAF-05-v1.0",
    docNumber: "FRM-SAF-05",
    name: "Annual Safety Audit Form",
    type: "Form",
    status: "Draft",
    stateCode: "S0",
    register: "MDR",
    owner: "Sarah Lee",
    version: "v1.0",
    updated: "2024-03-31T12:00:00Z",
    avatar: "SL",
    department: "Safety",
    description: "Standardized form for conducting annual safety audits.",
    content: "Safety audit checklist items...",
    versionHistory: []
  },
  {
    id: "SOP-QLTY-01-v2.0",
    docNumber: "SOP-QLTY-01",
    name: "Quality Audit Protocol",
    type: "SOP",
    status: "Approved-Pending Release",
    stateCode: "S4",
    register: "MDR",
    owner: "James Reed",
    version: "v2.0",
    updated: new Date().toISOString(),
    avatar: "JR",
    department: "Quality Assurance",
    description: "Protocol for conducting multi-departmental quality audits.",
    content: "Step 1: Planning... Step 2: Execution...",
    versionHistory: [
      { version: "v1.0", date: "2023-01-01T10:00:00Z", comment: "Initial" }
    ]
  },
  {
    id: "SOP-QLTY-01-v1.0",
    docNumber: "SOP-QLTY-01",
    name: "Quality Audit Protocol (Old)",
    type: "SOP",
    status: "Released",
    stateCode: "S5",
    register: "MDR",
    owner: "James Reed",
    version: "v1.0",
    updated: "2023-01-01T10:00:00Z",
    avatar: "JR",
    department: "Quality Assurance",
    description: "Old version of the protocol.",
    content: "Old steps...",
    versionHistory: []
  }
];

const initialComments = {
  "QM-001": [
    { id: 1, user: "James Reed", avatar: "JR", content: "Section 2 needs minor updates to reflect the new ISO sub-clauses.", timestamp: "2023-10-22T09:00:00Z", replies: [] },
    { id: 2, user: "Alex Morgan", avatar: "AM", content: "Acknowledged. Will include in the v4.1 minor revision next week.", timestamp: "2023-10-23T15:30:00Z", replies: [] }
  ]
};

const initialAuditLogs = {
  "QM-001": [
    { id: 1, user: "Alex Morgan", action: "CREATED", detail: "Initial document creation", timestamp: "2023-01-01T10:00:00Z" },
    { id: 2, user: "James Reed", action: "TRANSITION", detail: "Under Review -> Released", timestamp: "2023-10-24T10:00:00Z" }
  ],
  "SOP-QLTY-01-v2.0": [
    { id: 1, user: "Approver", action: "TRANSITION", detail: "Under Approval -> Approved", timestamp: "2023-12-31T10:00:00Z" }
  ]
};

export const useDocumentStore = create((set, get) => ({
  documents: initialDocuments,
  selectedDocument: null,
  comments: initialComments,
  auditLogs: initialAuditLogs,
  observations: {},
  nonConformities: {},
  userRole: ROLES.RM, // Default: Records Manager for testing
  isLoading: false,
  error: null,
  mockSignature: null,

  setUserRole: (role) => set({ userRole: role }),
  setMockSignature: (signature) => set({ mockSignature: signature }),

  addObservation: (docId, observation) => set((state) => {
    const newObs = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      ...observation
    };
    return {
      observations: {
        ...state.observations,
        [docId]: [...(state.observations[docId] || []), newObs]
      }
    };
  }),

  addNC: (docId, nc) => set((state) => {
    const newNC = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      ...nc
    };
    return {
      nonConformities: {
        ...state.nonConformities,
        [docId]: [...(state.nonConformities[docId] || []), newNC]
      }
    };
  }),

  fetchDocuments: async () => {
    set({ isLoading: true });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    set({ isLoading: false });
  },

  setSelectedDocument: (id) => {
    const doc = get().documents.find(d => d.id === id);
    set({ selectedDocument: doc ? { ...doc } : null });
  },

  addAuditEntry: (docId, entry) => {
    set((state) => ({
      auditLogs: {
        ...state.auditLogs,
        [docId]: [
          {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...entry
          },
          ...(state.auditLogs[docId] || [])
        ]
      }
    }));
  },

  addDocument: (doc) => {
    const newId = `DOC-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    set((state) => ({
      documents: [
        {
          ...doc,
          id: newId,
          docNumber: doc.docNumber || newId,
          updated: new Date().toISOString(),
          version: "v1.0",
          status: "Draft",
          stateCode: "S0",
          register: "MDR",
          avatar: "US",
          versionHistory: []
        },
        ...state.documents
      ]
    }));
    get().addAuditEntry(newId, { user: "System", action: ROLES.DO, detail: "Document registered in system (S0)" });
  },

  updateDocumentContent: (id, version, content, description, changeSummary, name, type, department, header1, header2, index1, index2, watermark) => {
    set((state) => {
      const updatedDocs = state.documents.map(doc => 
        doc.id === id ? { ...doc, version, content, description, name, type, department, header1, header2, index1, index2, watermark, updated: new Date().toISOString() } : doc
      );
      
      const updatedSelected = state.selectedDocument?.id === id 
        ? { ...state.selectedDocument, version, content, description, name, type, department, header1, header2, index1, index2, watermark, updated: new Date().toISOString() } 
        : state.selectedDocument;

      return {
        documents: updatedDocs,
        selectedDocument: updatedSelected
      };
    });

    get().addAuditEntry(id, { 
      user: "Current User", 
      action: "EDITED", 
      detail: `Content Update: ${changeSummary || 'Minor revision'}` 
    });
  },

  transitionStatus: (id, targetStateCode, forcedMajor = false) => {
    const state = get();
    const doc = state.documents.find(d => d.id === id);
    if (!doc) return;

    const oldStateCode = doc.stateCode;
    const targetState = STATES[targetStateCode];
    let version = doc.version;
    const history = [...(doc.versionHistory || [])];

    // Versioning Logic for S0-S7 machine
    if (targetStateCode === 'S5') {
      // Version persists from Draft to Released (no bump here anymore)
      version = doc.version;
      history.push({ version, date: new Date().toISOString(), comment: "S5 Release Approval" });
    } else if (targetStateCode === 'S2') { // Rework bump
      const [vStr, mStr] = version.substring(1).split('.');
      const minor = parseInt(mStr || 0);
      version = `v${vStr}.${minor + 1}`;
    }

    if (targetStateCode === 'S0' && (oldStateCode === 'S5' || oldStateCode === 'S6')) {
      // REVISION CASE: Create a NEW concurrent document record
      const parts = version.substring(1).split('.');
      const majorNum = parseInt(parts[0]);
      const minorNum = parseInt(parts[1] || 0);
      
      let newVersion;
      if (oldStateCode === 'S6' || forcedMajor) {
        // Major bump from Obsolete or forced by Process Owner
        newVersion = `v${majorNum + 1}.0`;
      } else {
        // Minor bump from Released
        newVersion = `v${majorNum}.${minorNum + 1}`;
      }
      
      const newId = `${doc.docNumber}-${newVersion}`;
      
      const newDoc = {
        ...doc,
        id: newId,
        version: newVersion,
        stateCode: 'S0',
        status: STATES.S0.label,
        versionHistory: [{ version: newVersion, date: new Date().toISOString(), comment: `Revision initiated for ${doc.version}` }],
        updated: new Date().toISOString()
      };

      set((state) => ({
        documents: [newDoc, ...state.documents]
      }));

      get().addAuditEntry(newId, { 
        user: `Role: ${get().userRole}`, 
        action: "REVISION", 
        detail: `New revision ${newVersion} created for ${doc.docNumber}. Master copy remains S5.` 
      });
      return newId; // Return new ID for navigation
    }

    // NORMAL TRANSITION
    set((state) => {
      let updatedDocs = state.documents.map(d => 
        d.id === id ? { ...d, status: targetState.label, stateCode: targetStateCode, version, versionHistory: history, updated: new Date().toISOString() } : d
      );

      // SUPERSEDE LOGIC: If a doc is released (S5), obsolete all previous Effective versions of same docNumber
      if (targetStateCode === 'S5') {
        const releasedIds = [];
        updatedDocs = updatedDocs.map(d => {
          if (d.docNumber === doc.docNumber && d.id !== doc.id && d.stateCode === 'S5') {
            releasedIds.push(d.id);
            return { ...d, stateCode: 'S6', status: STATES.S6.label, updated: new Date().toISOString() };
          }
          return d;
        });

        // Add explicit audit logs for each obsoleted version
        releasedIds.forEach(oldId => {
          state.addAuditEntry(oldId, {
            user: `Role: ${state.userRole}`,
            action: "OBSOLETED",
            detail: `Document made Obsolete following the release of new version ${doc.version}.`
          });
        });
      }

      const updatedSelected = state.selectedDocument?.id === id 
        ? { ...state.selectedDocument, status: targetState.label, stateCode: targetStateCode, version, versionHistory: history, updated: new Date().toISOString() } 
        : state.selectedDocument;

      return {
        documents: updatedDocs,
        selectedDocument: updatedSelected
      };
    });

    state.addAuditEntry(id, { 
      user: `Role: ${state.userRole}`, 
      action: "TRANSITION", 
      detail: `Status changed from ${STATES[oldStateCode].label} (${oldStateCode}) to ${targetState.label} (${targetStateCode})` 
    });
  },

  addComment: (docId, comment) => {
    set((state) => {
      const docComments = state.comments[docId] || [];
      const newComment = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        replies: [],
        ...comment
      };
      return {
        comments: {
          ...state.comments,
          [docId]: [...docComments, newComment]
        }
      };
    });
    
    get().addAuditEntry(docId, { 
      user: comment.user, 
      action: "COMMENTED", 
      detail: "Added a comment" 
    });
  },

  addReply: (docId, commentId, reply) => {
    set((state) => {
      const docComments = state.comments[docId] || [];
      const updatedComments = docComments.map(c => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [...c.replies, { id: Date.now(), timestamp: new Date().toISOString(), ...reply }]
          };
        }
        return c;
      });
      return {
        comments: {
          ...state.comments,
          [docId]: updatedComments
        }
      };
    });

    get().addAuditEntry(docId, { 
      user: reply.user, 
      action: "REPLIED", 
      detail: "Replied to a comment" 
    });
  }
}));


