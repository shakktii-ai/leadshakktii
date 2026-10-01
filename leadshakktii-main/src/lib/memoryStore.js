// Global in-memory storage for audit reports when MongoDB is not configured or in local development

if (!global.__inMemoryAudits) {
  global.__inMemoryAudits = [];
}

export const memoryStore = {
  saveAudit(auditDoc) {
    // Check if already exists
    const idx = global.__inMemoryAudits.findIndex(
      (a) => a.reportId === auditDoc.reportId || a.leadId === auditDoc.leadId
    );
    if (idx !== -1) {
      global.__inMemoryAudits[idx] = auditDoc;
    } else {
      global.__inMemoryAudits.unshift(auditDoc);
    }
    return auditDoc;
  },

  findAuditById(id) {
    return (
      global.__inMemoryAudits.find(
        (a) => a.reportId === id || a.leadId === id
      ) || null
    );
  },

  getAllAudits() {
    return [...global.__inMemoryAudits];
  },

  deleteAudit(leadId) {
    const idx = global.__inMemoryAudits.findIndex((a) => a.leadId === leadId);
    if (idx !== -1) {
      return global.__inMemoryAudits.splice(idx, 1)[0];
    }
    return null;
  },
};
