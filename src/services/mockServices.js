import { ROLES } from "@/store/useDocumentStore";

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
      'S4': { 'RELEASE': 'S5', 'REQUEST_RM': 'S4_RM' },
      'S4_RM': { 'RELEASE': 'S5' },
      'S5': { 'REVISE': 'S0', 'OBSOLETE': 'S6', 'AUDIT_FAIL': 'S2' },
      'S6': { 'REVISE': 'S0', 'ARCHIVE': 'S7' },
      'S7': {}
    };
    return transitions[currentStateCode]?.[action] || currentStateCode;
  },

  getAvailableActions: (stateCode, role, hasPreviousVersion = false) => {
    const actions = [];

    // S0: Draft - DO creates/submits
    if (stateCode === 'S0' && role === ROLES.DO) {
      actions.push({ id: 'SUBMIT', label: 'Submit for Review (S1)', variant: 'primary' });
    }

    // S1: Under Review - REV checks
    if (stateCode === 'S1' && role === ROLES.REV) {
      actions.push({ id: 'ACCEPT', label: 'Accept Technicals', variant: 'primary' });
      actions.push({ id: 'REWORK', label: 'Request Rework (S2)', variant: 'outline' });
    }

    // S2: Rework - DO fixes
    if (stateCode === 'S2' && role === ROLES.DO) {
      actions.push({ id: 'SUBMIT', label: 'Re-Submit for Review', variant: 'primary' });
    }

    // S3: Under Approval - APP signs
    if (stateCode === 'S3' && role === ROLES.APP) {
      actions.push({ id: 'APPROVE', label: 'Digitally Sign & Approve', variant: 'primary' });
      actions.push({ id: 'REJECT', label: 'Reject to Rework', variant: 'destructive' });
    }

    // S4: Pending Release - Admin (DCA) Review
    if (stateCode === 'S4' && role === ROLES.DCA) {
      if (!hasPreviousVersion) {
        actions.push({ id: 'RELEASE', label: 'Initial Release (v1.0)', variant: 'primary' });
      } else {
        actions.push({ id: 'REQUEST_RM', label: 'Verify & Request RM Release', variant: 'primary' });
      }
    }

    // S4_RM: Pending RM Release - Records Manager (RM) performs final action
    if (stateCode === 'S4_RM' && role === ROLES.RM) {
      actions.push({ id: 'RELEASE', label: 'Final Release & Obsolete Old', variant: 'primary' });
      actions.push({ id: 'REJECT', label: 'Send Back to Admin', variant: 'destructive' });
    }

    // S5: Released - PO creates new versions (Initiates DCR)
    if (stateCode === 'S5') {
      if (role === ROLES.PO) {
        actions.push({ id: 'REVISE', label: 'Initiate Major Revision', variant: 'outline' });
      }
    }

    // S6: Obsolete - RM archives or REVISE for new major version
    if (stateCode === 'S6') {
      if (role === ROLES.RM) {
        actions.push({ id: 'ARCHIVE', label: 'Move to Archive (S7)', variant: 'outline' });
      }
      if (role === ROLES.PO) {
        actions.push({ id: 'REVISE', label: 'New Major Version (Revise)', variant: 'outline' });
      }
    }

    // PO Exception / Escalation (Can move S3 -> S5 directly if authorized)
    // Internal Auditor - Can comment on anything
    if (role === ROLES.INTERNAL_AUDITOR) {
      actions.push({ id: 'RAISE_OBSERVATION', label: 'Raise Observation', variant: 'outline' });
    }

    // External Auditor - Can verify effective docs or reject them
    if (role === ROLES.EXTERNAL_AUDITOR && (stateCode === 'S5' || stateCode === 'S6')) {
      actions.push({ id: 'AUDIT_PASS', label: 'Formal Audit Sign-off', variant: 'primary' });
      actions.push({ id: 'AUDIT_FAIL', label: 'Raise Major Non-Conformity', variant: 'destructive' });
    }

    return actions;
  }
};



