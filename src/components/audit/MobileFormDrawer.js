'use client';

import React from 'react';
import { X } from 'lucide-react';
import LeadCaptureSidebar from './LeadCaptureSidebar';

export default function MobileFormDrawer({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Tap backdrop to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-Up Drawer Content */}
      <div className="relative w-full max-h-[90vh] bg-white rounded-t-3xl shadow-2xl overflow-y-auto p-4 pt-3 pb-8 animate-in slide-in-from-bottom duration-300">
        {/* Top Handle & Close Button */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto" />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 absolute right-4 top-3"
            aria-label="Close form drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <LeadCaptureSidebar
          onSubmit={async (data) => {
            await onSubmit(data);
            onClose();
          }}
          isSubmitting={isSubmitting}
          isMobileModal={true}
        />
      </div>
    </div>
  );
}
