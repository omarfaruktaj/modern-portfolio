"use client";

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

  const sectionRef = useRef<HTMLElement>(null);
  const socialLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for the entire section's animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Start the animation when the section is 80% in view
          toggleActions: "play none none reverse",
        },
      });

      // Animate the main heading and sub-headline
      tl.fromTo(
        ".contact-header",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Animate the left-side content (title and paragraph)
      tl.fromTo(
        ".contact-info-left",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        "-=0.5"
      );

      // Animate the form on the right side
      tl.fromTo(
        ".contact-form-right",
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        "<" // Use a "<" to make this animation start at the same time as the previous one
      );

      // Animate the social links with a stagger effect
      tl.fromTo(
        socialLinksRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP animation for form steps
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [currentStep, isSubmitted]);

  const conversationSteps: {
    id: string;
    question: string;
    field: keyof FormData;
    type: string;
    placeholder?: string;
    options?: string[];
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
  ];

  const handleInputChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [conversationSteps[currentStep].field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < conversationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "3434343@gmail.com",
      href: "mailto:43434@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+343434343",
      href: "tel:+8801798642262",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "dhaka, Bangladesh",
      href: "#",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/me-dfdfd",
      href: "https://linkedin.com/in/me-dfdfd-fdf",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@fdfdfsdf",
      href: "https://github.com/dfdfdfdf",
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: "@me_omar",
      href: "https://twitter.com/fdfdfsdf",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="flex items-center justify-center min-h-screen py-24 px-4 relative overflow-hidden 
             bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 
             dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900"
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
                <a
                  key={link.label}
                  href={link.href}
                  ref={(el) => {
                    socialLinksRef.current[index] = el;
                  }}
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
                </a>
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
                      id="progress-bar"
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
                          type={conversationSteps[currentStep].type}
                          placeholder={
                            conversationSteps[currentStep].placeholder
                          }
                          value={formData[conversationSteps[currentStep].field]}
                          onChange={(e) => handleInputChange(e.target.value)}
                          className="w-full dark:bg-white/10 border dark:border-white/20 rounded-xl px-4 py-3 dark:text-white placeholder-muted-foreground focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        />
                      ) : (
                        <textarea
                          placeholder={
                            conversationSteps[currentStep].placeholder
                          }
                          value={formData[conversationSteps[currentStep].field]}
                          onChange={(e) => handleInputChange(e.target.value)}
                          rows={4}
                          className="w-full dark:bg-white/10 border dark:border-white/20 rounded-xl px-4 py-3 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6">
                    <button
                      onClick={() =>
                        setCurrentStep(Math.max(0, currentStep - 1))
                      }
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
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 dark:text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
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
