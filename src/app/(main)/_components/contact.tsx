"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircle,
  Github,
  Linkedin,
  Loader,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

type FormData = {
  name: string;
  email: string;
  project: string;
  budget: string;
  message: string;
  timeline: string;
};

const ContactSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    project: "",
    budget: "",
    message: "",
    timeline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const socialLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const inputElRef = useRef<HTMLInputElement>(null);
  const textareaElRef = useRef<HTMLTextAreaElement>(null);
  const [isInView, setIsInView] = useState(false);

  const conversationSteps: {
    id: string;
    question: string;
    field: keyof FormData;
    type: "text" | "email" | "textarea";
    placeholder: string;
  }[] = [
    {
      id: "greeting",
      question: "Hi there! 👋 What's your name?",
      field: "name",
      type: "text",
      placeholder: "Enter your name...",
    },
    {
      id: "email",
      question: `Nice to meet you, ${formData.name}! What's your email?`,
      field: "email",
      type: "email",
      placeholder: "your.email@example.com",
    },
    {
      id: "message",
      question: "Tell me more about your project vision:",
      field: "message",
      type: "textarea",
      placeholder:
        "Describe your project, goals, and any specific requirements...",
    },
    {
      id: "budget",
      question: "Do you have a project budget in mind?",
      field: "budget",
      type: "text",
      placeholder: "e.g., $5,000 - $10,000",
    },
    {
      id: "timeline",
      question: "What is your ideal timeline?",
      field: "timeline",
      type: "text",
      placeholder: "e.g., 3 months",
    },
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.4, // Adjust depending on when you want to trigger focus
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem("contactFormData");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    if (!isInView) return;

    if (
      conversationSteps[currentStep].type === "text" ||
      conversationSteps[currentStep].type === "email"
    ) {
      inputElRef.current?.focus();
    } else {
      textareaElRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("contactFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".contact-header",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      );
      tl.fromTo(
        ".contact-info-left",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1 },
        "-=0.5"
      );
      tl.fromTo(
        ".contact-form-right",
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1 },
        "<"
      );
      tl.fromTo(
        socialLinksRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, [currentStep, isSubmitted]);

  const validateStep = (): boolean => {
    const { field } = conversationSteps[currentStep];
    const value = formData[field];

    switch (field) {
      case "name":
        return value.trim().length >= 2;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "message":
        return value.trim().length >= 10;
      default:
        return true;
    }
  };

  const handleInputChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [conversationSteps[currentStep].field]: value,
    }));
    setErrors(null);
  };

  const handleNext = () => {
    if (!validateStep()) {
      setErrors("Please enter valid information.");
      return;
    }

    setErrors(null);

    if (currentStep < conversationSteps.length - 1) {
      sendGTMEvent({
        event: "form_step",
        category: "Contact Form",
        label: conversationSteps[currentStep].field,
        value: currentStep + 1,
        user_input: formData[conversationSteps[currentStep].field],
      });

      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        localStorage.removeItem("contactFormData");
        sendGTMEvent({
          event: "form_submit",
          category: "Contact Form",
          label: "Successful Submission",
          value: formData.email,
        });
      } else {
        const result = await res.json();

        setErrors(result.error || "Failed to send email.");
        sendGTMEvent({
          event: "form_error",
          category: "Contact Form",
          label: "Submit Failed",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrors("Something went wrong. Please try again.");
      sendGTMEvent({
        event: "form_error",
        category: "Contact Form",
        label: "Exception Thrown",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      e.key === "Enter" &&
      conversationSteps[currentStep].type !== "textarea"
    ) {
      e.preventDefault();
      handleNext();
    }
  };

  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "omarabdullah1811@gmail.com",
      href: "mailto:omarabdullah1811@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+8801798642262",
      href: "tel:+8801798642262",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Cumilla, Bangladesh",
      href: "#",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/me-omar-faruk",
      href: "https://linkedin.com/in/me-omar-faruk",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@omarfaruktaj",
      href: "https://github.com/omarfaruktaj",
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: "@me_omar",
      href: "https://twitter.com/me_omar",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="flex items-center justify-center min-h-screen py-24 px-4 relative overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="contact-header text-center mb-16 opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let&apos;s have a conversation
            about your next project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="contact-info-left space-y-8 opacity-0">
            <div>
              <h3 className="text-3xl font-bold dark:text-white mb-6">
                Get in Touch
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                I&apos;m always excited to work on new projects and collaborate
                with amazing people. Whether you have a clear vision or just an
                idea, let&apos;s discuss how we can make it happen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  ref={(el) => {
                    socialLinksRef.current[index] = el;
                  }}
                  onClick={() =>
                    sendGTMEvent({
                      event: "social_click",
                      category: "Contact",
                      label: link.label,
                      value: link.href,
                    })
                  }
                  className="group flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 opacity-0"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="dark:text-white font-medium">{link.label}</p>
                    <p className="text-muted-foreground text-sm">
                      {link.value}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="contact-form-right dark:bg-white/5 backdrop-blur-md rounded-2xl border dark:border-muted p-8 mt-auto opacity-0">
            {!isSubmitted ? (
              <div ref={formRef}>
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>
                      Step {currentStep + 1} of {conversationSteps.length}
                    </span>
                    <span>
                      {Math.round(
                        ((currentStep + 1) / conversationSteps.length) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full dark:bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{
                        width: `${
                          ((currentStep + 1) / conversationSteps.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div key={currentStep} className="form-step-content">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="dark:bg-white/10 rounded-2xl rounded-tl-none p-4 max-w-md">
                        <p className="dark:text-white">
                          {conversationSteps[currentStep].question}
                        </p>
                      </div>
                    </div>

                    <div className="ml-14">
                      {conversationSteps[currentStep].type === "text" ||
                      conversationSteps[currentStep].type === "email" ? (
                        <input
                          ref={inputElRef}
                          type={conversationSteps[currentStep].type}
                          placeholder={
                            conversationSteps[currentStep].placeholder
                          }
                          value={formData[conversationSteps[currentStep].field]}
                          onChange={(e) => handleInputChange(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="w-full dark:bg-white/10 border dark:border-white/20 rounded-xl px-4 py-3 dark:text-white placeholder-muted-foreground focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        />
                      ) : (
                        <textarea
                          ref={textareaElRef}
                          placeholder={
                            conversationSteps[currentStep].placeholder
                          }
                          value={formData[conversationSteps[currentStep].field]}
                          onChange={(e) => handleInputChange(e.target.value)}
                          onKeyDown={handleKeyDown}
                          rows={4}
                          className="w-full dark:bg-white/10 border dark:border-white/20 rounded-xl px-4 py-3 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                        />
                      )}
                      {errors && (
                        <p className="text-red-500 text-sm mt-2">{errors}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6">
                    <button
                      onClick={() => {
                        setErrors(null);
                        setCurrentStep(Math.max(0, currentStep - 1));
                      }}
                      disabled={currentStep === 0}
                      className="px-6 py-3 dark:text-gray-400 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                    >
                      Back
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={
                        !formData[conversationSteps[currentStep].field] ||
                        isSubmitting
                      }
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>
                            {currentStep === conversationSteps.length - 1
                              ? "Send Message"
                              : "Next"}
                          </span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div ref={formRef} className="text-center py-12">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold dark:text-white mb-4">
                  Message Sent! 🎉
                </h3>
                <p className="text-muted-foreground mb-6">
                  Thanks for reaching out! I&apos;ll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(0);
                    setFormData({
                      name: "",
                      email: "",
                      project: "",
                      budget: "",
                      message: "",
                      timeline: "",
                    });
                  }}
                  className="px-6 py-3 dark:bg-white/10 bg-black/10 dark:text-white rounded-xl dark:hover:bg-white/20 transition-all duration-300"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
