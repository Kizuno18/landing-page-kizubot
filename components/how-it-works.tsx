"use client"

import { motion } from "framer-motion"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-secondary-pattern">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <p className="section-tag">{"$ "} ./run</p>
          <h2 className="text-4xl font-bold text-foreground">Como Funciona</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Veja como o KizuBot automatiza suas tarefas no jogo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden shadow-2xl"
          >
            <img
              src="/media/animations/demo-farming-animation.gif"
              alt="Demonstração de farming automatizado"
              width={320}
              height={240}
              className="w-full rounded-xl border border-primary/30"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-accent mb-6">Farming Automatizado</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="classic-label bg-accent p-3 rounded-full shrink-0"><span className="text-white font-bold">1</span></div>
                <span className="hud-label font-mono text-primary text-xs font-bold mt-1 shrink-0">PHASE_01</span>
                <div>
                  <h4 className="text-xl font-semibold text-white">Configure seu Bot</h4>
                  <p className="text-gray-300 mt-2">
                    Escolha as configurações de farming, combate, captura e alarmes de acordo com suas necessidades.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="classic-label bg-secondary p-3 rounded-full shrink-0"><span className="text-secondary-foreground font-bold">2</span></div>
                <span className="hud-label font-mono text-primary text-xs font-bold mt-1 shrink-0">PHASE_02</span>
                <div>
                  <h4 className="text-xl font-semibold text-white">Defina Waypoints</h4>
                  <p className="text-gray-300 mt-2">
                    Use o módulo Cavebot para gravar rotas e definir pontos de caça automatizados.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="classic-label bg-secondary p-3 rounded-full shrink-0"><span className="text-secondary-foreground font-bold">3</span></div>
                <span className="hud-label font-mono text-primary text-xs font-bold mt-1 shrink-0">PHASE_03</span>
                <div>
                  <h4 className="text-xl font-semibold text-white">Ative e Relaxe</h4>
                  <p className="text-gray-300 mt-2">
                    O KizuBot cuida de tudo: combate, cura, captura de pokémons especiais e coleta de recursos.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 md:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-accent mb-6">Controles Simples</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="classic-label bg-secondary p-3 rounded-full shrink-0"><span className="text-secondary-foreground font-bold">1</span></div>
                  <span className="hud-label font-mono text-primary text-xs font-bold mt-1 shrink-0">CTRL_01</span>
                  <div>
                    <h4 className="text-xl font-semibold text-white">Botão Bot</h4>
                    <p className="text-gray-300 mt-2">
                      Ativa e desativa o BOT com um simples clique. Interface intuitiva diretamente no jogo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="classic-label bg-secondary p-3 rounded-full shrink-0"><span className="text-secondary-foreground font-bold">2</span></div>
                  <span className="hud-label font-mono text-primary text-xs font-bold mt-1 shrink-0">CTRL_02</span>
                  <div>
                    <h4 className="text-xl font-semibold text-white">Botão Recorder</h4>
                    <p className="text-gray-300 mt-2">
                      Ativa o reconhecimento do mapa, função principal para configurar o cavebot. Sempre inicie e
                      termine no mesmo ponto.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="classic-label bg-accent p-3 rounded-full shrink-0"><span className="text-white font-bold">3</span></div>
                  <span className="hud-label font-mono text-primary text-xs font-bold mt-1 shrink-0">CTRL_03</span>
                  <div>
                    <h4 className="text-xl font-semibold text-white">Painel de Configuração</h4>
                    <p className="text-gray-300 mt-2">
                      Interface completa para personalizar todos os aspectos do bot de acordo com suas necessidades.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src="/images/botoes_do_bot_in_game.jpg"
                alt="Botões do Bot no jogo"
                width={943}
                height={219}
                className="w-full rounded-xl border border-primary/30"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
