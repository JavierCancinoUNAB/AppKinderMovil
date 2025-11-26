import { motion } from 'motion/react';
import { Baby } from 'lucide-react';

export function FloatingTitle() {
  return (
    <motion.div
      className="text-center py-8"
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="flex items-center justify-center gap-3 mb-2">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Baby className="size-10 text-purple-600" />
        </motion.div>
        <h1 className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          KinderJump
        </h1>
      </div>
      <p className="text-gray-600">Gestión de Asistencia</p>
    </motion.div>
  );
}
