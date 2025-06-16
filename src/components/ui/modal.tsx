import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GlassCard } from "@/components/ui/glassCard";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, subtitle, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative max-w-2xl w-full mx-4"
          >
            <GlassCard className="p-6" hover={false}>
              <button className="absolute top-4 right-4 text-[#666] hover:text-white transition-colors" onClick={onClose}>
                <X size={24} />
              </button>
              <h2 className="text-xl font-bold mb-4 gradient-text"> {title} </h2>
              <h2 className="text-sm mb-4 gradient-text"> {subtitle} </h2>
              <div className="text-[#B0B0B0] space-y-4"> {children} </div>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
