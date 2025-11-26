import { motion } from 'framer-motion';
import { CircleDollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';

export const FallingCoins = () => {
  const [coins, setCoins] = useState<number[]>([]);

  useEffect(() => {
    // Cria 15 moedas com posições aleatórias
    const initialCoins = Array.from({ length: 15 }, (_, i) => i);
    setCoins(initialCoins);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {coins.map((i) => (
        <motion.div
          key={i}
          initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 0 }}
          animate={{
            y: window.innerHeight + 100,
            opacity: [0, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 5 + 5, // Duração entre 5s e 10s
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
          className="absolute text-gold-accent/20"
        >
            {/* Ícone de moeda do Lucide */}
          <CircleDollarSign size={Math.random() * 30 + 20} />
        </motion.div>
      ))}
    </div>
  );
};