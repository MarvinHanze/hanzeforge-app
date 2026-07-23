'use client'

import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Hammer } from 'lucide-react'

import { useConfiguratorStore, TOTAL_STEPS } from '@/lib/store/configurator-store'
import { navigationOptions, themeOptions, searchBarOptions } from '@/lib/registry'
import { StepNav, type StepDefinition } from '@/components/configurator/StepNav'
import { OptionCard } from '@/components/configurator/OptionCard'
import { SectionPicker } from '@/components/configurator/SectionPicker'
import { SummaryPanel } from '@/components/configurator/SummaryPanel'
import { PreviewFrame } from '@/components/preview/PreviewFrame'
import { Button } from '@/components/ui/button'

const STEPS: StepDefinition[] = [
  { label: 'Navigatie', description: 'Kies de indeling van je navigatie.' },
  { label: 'Kleurthema', description: 'Kies de kleurstijl van je dashboard.' },
  { label: 'Zoekbalk', description: 'Kies hoe gebruikers gaan zoeken.' },
  { label: 'Secties', description: 'Kies welke onderdelen je dashboard toont.' },
  { label: 'Overzicht', description: 'Controleer je configuratie en vraag een voorstel aan.' },
]

const variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 32 : -32 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -32 : 32 }),
}

export default function Home() {
  const {
    currentStep,
    navigationId,
    themeId,
    searchBarId,
    sectionIds,
    setStep,
    nextStep,
    prevStep,
    setNavigation,
    setTheme,
    setSearchBar,
    toggleSection,
  } = useConfiguratorStore()

  const directionRef = useRef(1)

  function goToStep(target: number) {
    directionRef.current = target > currentStep ? 1 : -1
    setStep(target)
  }

  function handleNext() {
    directionRef.current = 1
    nextStep()
  }

  function handlePrev() {
    directionRef.current = -1
    prevStep()
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Hammer className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">HanzeForge</h1>
          <p className="text-sm text-muted-foreground">
            Configureer live het dashboard van jouw demo-webapp — kies, bekijk, herhaal.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Wizard column */}
        <section className="flex min-w-0 flex-col gap-6">
          <StepNav steps={STEPS} currentStep={currentStep} onStepClick={goToStep} />

          <div className="relative min-h-[420px] overflow-hidden">
            <AnimatePresence mode="wait" custom={directionRef.current} initial={false}>
              <motion.div
                key={currentStep}
                custom={directionRef.current}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-foreground">{STEPS[currentStep].label}</h2>
                  <p className="text-sm text-muted-foreground">{STEPS[currentStep].description}</p>
                </div>

                {currentStep === 0 && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {navigationOptions.map((option) => (
                      <OptionCard
                        key={option.id}
                        option={option}
                        selected={navigationId === option.id}
                        onSelect={setNavigation}
                      />
                    ))}
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {themeOptions.map((option) => (
                      <OptionCard
                        key={option.id}
                        option={option}
                        selected={themeId === option.id}
                        onSelect={setTheme}
                      />
                    ))}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {searchBarOptions.map((option) => (
                      <OptionCard
                        key={option.id}
                        option={option}
                        selected={searchBarId === option.id}
                        onSelect={setSearchBar}
                      />
                    ))}
                  </div>
                )}

                {currentStep === 3 && (
                  <SectionPicker sectionIds={sectionIds} onToggle={toggleSection} />
                )}

                {currentStep === 4 && (
                  <SummaryPanel
                    navigationId={navigationId}
                    themeId={themeId}
                    searchBarId={searchBarId}
                    sectionIds={sectionIds}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Vorige
            </Button>
            {currentStep < TOTAL_STEPS - 1 && (
              <Button onClick={handleNext} className="gap-2">
                Volgende
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </section>

        {/* Live preview column */}
        <section className="lg:sticky lg:top-8 lg:self-start">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Live preview
          </p>
          <PreviewFrame
            navigationId={navigationId}
            themeId={themeId}
            searchBarId={searchBarId}
            sectionIds={sectionIds}
          />
        </section>
      </div>
    </main>
  )
}
