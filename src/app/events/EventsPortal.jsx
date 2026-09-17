"use client";

import { useState } from "react";
import Link from "next/link";
import { applyFaq } from "@/data/applyFaq";
import EmptyState from "@/components/EmptyState";
import { Button, Card, SectionHeader, StatusBadge } from "@/components/ui";

/**
 * EventsPortal — the client half of /events (see page.js for the data
 * assembly and the section breakdown). Handles only the FAQ accordion's
 * open/closed state; everything else is presentation.
 */

function ApplicationRow({ application }) {
  const meta = [application.eligibility, application.timeEstimate];
  if (application.isOpen && application.deadlineLabel) meta.push(application.deadlineLabel);

  return (
    <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-neutral-200 bg-surface-card p-6 shadow-sm transition-all hover:border-neutral-400 md:flex-row md:items-center">
      <div className="min-w-0 flex-1">
        <StatusBadge status={application.status} />
        <h3 className="mt-2 text-lg font-bold text-text">{application.name}</h3>
        <p className="mt-1 text-sm text-text-muted">{application.tagline}</p>
        <p className="mt-2 text-caption font-medium uppercase tracking-wide text-text-muted">
          {meta.filter(Boolean).join("  ·  ")}
        </p>
        <Link
          href={`/programs/${application.slug}`}
          className="mt-2 inline-block text-sm font-semibold text-text-muted underline hover:text-text"
        >
          About this program →
        </Link>
      </div>

      {application.isOpen ? (
        <Button
          variant="primary"
          size="sm"
          href={application.applicationUrl}
          fullWidth
          className="shrink-0 md:w-auto"
        >
          Apply Now →
        </Button>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          href="#waitlist"
          fullWidth
          className="shrink-0 md:w-auto"
        >
          {application.status === "announced" ? "Get Notified" : "Join the Waitlist"}
        </Button>
      )}
    </div>
  );
}

function EventCard({ event, past = false }) {
  return (
    <Card as="article" className="flex flex-col">
      <p className="text-caption font-semibold uppercase tracking-wide text-text-muted">
        {event.date}
        {event.location ? ` · ${event.location}` : ""}
      </p>
      <h3 className="mt-2 text-h4 font-sans font-extrabold text-text">
        {event.title}
        {event.isPlaceholder && (
          <span className="ml-2 align-middle text-caption font-semibold uppercase text-accent-ink">
            TODO
          </span>
        )}
      </h3>
      <p className={`mt-2 flex-1 text-body ${past ? "text-text-muted" : "text-text-muted"}`}>
        {event.description}
      </p>
    </Card>
  );
}

export default function EventsPortal({ applications, upcomingEvents, pastEvents }) {
  const [openIndex, setOpenIndex] = useState(null);

  const openApplications = applications.filter((a) => a.isOpen);
  const closedApplications = applications.filter((a) => !a.isOpen);

  return (
    <div className="bg-neutral-50">
      <div className="border-b border-surface-dark-deep bg-surface-dark px-6 pb-12 pt-16 text-center text-white">
        <h1 className="text-3xl font-black tracking-tight md:text-5xl">EVENTS &amp; APPLICATIONS</h1>
        <p className="mx-auto mt-3 max-w-xl text-on-dark/70">
          Every open NGEN application cycle, plus what we&rsquo;ve run so far.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Open applications */}
        <section>
          <SectionHeader eyebrow="OPEN APPLICATIONS" title="Apply now" />
          <div className="mt-6 space-y-4">
            {openApplications.length > 0 ? (
              openApplications.map((application) => (
                <ApplicationRow key={application.slug} application={application} />
              ))
            ) : (
              <p className="text-text-muted">
                Nothing&rsquo;s open for applications right now — see what&rsquo;s next below.
              </p>
            )}
          </div>
        </section>

        {/* Not currently open */}
        {closedApplications.length > 0 && (
          <section className="mt-16">
            <SectionHeader eyebrow="COMING UP" title="Plan ahead" />
            <div className="mt-6 space-y-4">
              {closedApplications.map((application) => (
                <ApplicationRow key={application.slug} application={application} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming event instances */}
        {upcomingEvents.length > 0 && (
          <section className="mt-16">
            <SectionHeader eyebrow="ON THE CALENDAR" title="Upcoming events" />
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Past event instances — proof/history */}
        {pastEvents.length > 0 && (
          <section className="mt-16">
            <SectionHeader eyebrow="TRACK RECORD" title="Past events" />
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} past />
              ))}
            </div>
          </section>
        )}

        {/* How it works */}
        <section className="mt-16">
          <SectionHeader eyebrow="FAQ" title="How it works" />
          <div className="mt-6 space-y-3">
            {applyFaq.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <Card key={item.question} padded={false} className="p-5">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left font-semibold text-text"
                  >
                    {item.question}
                    <svg
                      className={`h-5 w-5 shrink-0 text-text-muted transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`pt-3 text-sm text-text-muted transition-opacity duration-300 ease-in-out ${
                          isOpen ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Waitlist — always available so a closed cycle is never a dead
              end, and the sole state when nothing is open. */}
          <div className="mt-12">
            <EmptyState
              id="waitlist"
              heading={
                openApplications.length > 0
                  ? "Don't see the right cycle?"
                  : "Nothing's open for applications right now"
              }
              message="Join the list and we'll email you the moment the next cycle opens."
            />
          </div>
        </section>
      </div>
    </div>
  );
}
