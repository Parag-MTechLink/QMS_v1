const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const documentService = {
  getDocuments: async () => {
    await delay(800);
    return []; // The actual state is in the store, but this is for API simulation structure
  },

  createDocument: async (doc) => {
    await delay(1200);
    return { ...doc, id: `DOC-${Math.random().toString(36).substr(2, 9)}`, status: 'Draft' };
  }
};

export const workflowService = {
  getNextStatus: (currentStateCode, action) => {
    const transitions = {
      'S0': { 'SUBMIT': 'S1' },
      'S1': { 'ACCEPT': 'S3', 'REWORK': 'S2' },
      'S2': { 'SUBMIT': 'S1' },
      'S3': { 'APPROVE': 'S4', 'REJECT': 'S2' },
      'S4': { 'RELEASE': 'S5' },
      'S5': { 'REVISE': 'S0', 'OBSOLETE': 'S6' },
      'S6': { 'ARCHIVE': 'S7' },
      'S7': {}
    };
    return transitions[currentStateCode]?.[action] || currentStateCode;
  },

  getAvailableActions: (stateCode, role) => {
    const actions = [];

    // S0: Draft - DO creates/submits
    if (stateCode === 'S0' && role === 'DO') {
      actions.push({ id: 'SUBMIT', label: 'Submit for Review (S1)', variant: 'primary' });
    }

    // S1: Under Review - REV checks
    if (stateCode === 'S1' && role === 'REV') {
      actions.push({ id: 'ACCEPT', label: 'Accept Technicals', variant: 'primary' });
      actions.push({ id: 'REWORK', label: 'Request Rework (S2)', variant: 'outline' });
    }

    // S2: Rework - DO fixes
    if (stateCode === 'S2' && role === 'DO') {
      actions.push({ id: 'SUBMIT', label: 'Re-Submit for Review', variant: 'primary' });
    }

    // S3: Under Approval - APP signs
    if (stateCode === 'S3' && role === 'APP') {
      actions.push({ id: 'APPROVE', label: 'Digitally Sign & Approve', variant: 'primary' });
      actions.push({ id: 'REJECT', label: 'Reject to Rework', variant: 'destructive' });
    }

    // S4: Pending Release - DCA manages distribution
    if (stateCode === 'S4' && role === 'DCA') {
      actions.push({ id: 'RELEASE', label: 'Publish to MDR (S5)', variant: 'primary' });
    }

    // S5: Released - DO can revise, RM can obsolete
    if (stateCode === 'S5') {
      if (role === 'DO' || role === 'PO') {
        actions.push({ id: 'REVISE', label: 'Initiate DCR (Revise)', variant: 'outline' });
      }
      if (role === 'RM') {
        actions.push({ id: 'OBSOLETE', label: 'Mark as Obsolete (S6)', variant: 'destructive' });
      }
    }

    // S6: Obsolete - RM archives
    if (stateCode === 'S6' && role === 'RM') {
      actions.push({ id: 'ARCHIVE', label: 'Move to Archive (S7)', variant: 'outline' });
    }

    // PO Exception / Escalation (Can move S3 -> S5 directly if authorized)
    if (role === 'PO' && (stateCode === 'S3' || stateCode === 'S4')) {
      actions.push({ id: 'RELEASE', label: 'PO Emergency Release', variant: 'secondary' });
    }

    return actions;
  }
};



export const aiService = {
  getPrecheckReport: async (content) => {
    await delay(1500);
    return {
      risks: [
        { id: 1, type: 'CRITICAL', title: 'Missing ISO 9001:2015 link', description: 'Section 4 does not reference the normative standard.' },
        { id: 2, type: 'WARNING', title: 'Vague Responsibilities', description: 'The role of "Quality Lead" is not defined in the glossary.' }
      ],
      gaps: [
        { id: 1, title: 'Missing Annex A', description: 'Typical QMS manuals include an Annex for process maps.' }
      ],
      complianceScore: 78
    };
  }
};
