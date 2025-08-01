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
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

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
    // {
    //   id: "project",
    //   question: "What kind of project are you working on?",
    //   field: "project",
    //   type: "select",
    //   options: [
    //     "Web Application",
    //     "Mobile App",
    //     "E-commerce Site",
    //     "Portfolio Website",
    //     "Custom Software",
    //     "Other",
    //   ],
    // },
    // {
    //   id: "budget",
    //   question: "What's your budget range for this project?",
    //   field: "budget",
    //   type: "select",
    //   options: [
    //     "$5K - $10K",
    //     "$10K - $25K",
    //     "$25K - $50K",
    //     "$50K+",
    //     "Let's discuss",
    //   ],
    // },
    // {
    //   id: "timeline",
    //   question: "When would you like to get started?",
    //   field: "timeline",
    //   type: "select",
    //   options: [
    //     "ASAP",
    //     "Within 1 month",
    //     "Within 3 months",
    //     "Within 6 months",
    //     "Just exploring",
    //   ],
    // },
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
      id="contact"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 py-20 px-4 relative overflow-hidden"
    >
      {/* Background Effects */}
      {/* <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div> */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s Connect
            {/* <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Connect
            </span> */}
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let&apos;s have a conversation
            about your next project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
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

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Conversational Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="dark:bg-white/5 backdrop-blur-md rounded-2xl border dark:border-muted p-8 mt-auto"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Progress Bar */}
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
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            ((currentStep + 1) / conversationSteps.length) * 100
                          }%`,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Conversation */}
                  <div className="space-y-6">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
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

                      {/* Input Field */}
                      <div className="ml-14">
                        {conversationSteps[currentStep].type === "text" ||
                        conversationSteps[currentStep].type === "email" ? (
                          <input
                            type={conversationSteps[currentStep].type}
                            placeholder={
                              conversationSteps[currentStep].placeholder
                            }
                            value={
                              formData[conversationSteps[currentStep].field]
                            }
                            onChange={(e) => handleInputChange(e.target.value)}
                            className="w-full dark:bg-white/10 border dark:border-white/20 rounded-xl px-4 py-3 dark:text-white placeholder-muted-foreground focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                            // autoFocus
                          />
                        ) : (
                          <textarea
                            placeholder={
                              conversationSteps[currentStep].placeholder
                            }
                            value={
                              formData[conversationSteps[currentStep].field]
                            }
                            onChange={(e) => handleInputChange(e.target.value)}
                            rows={4}
                            className="w-full dark:bg-white/10 border dark:border-white/20 rounded-xl px-4 py-3 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                            // autoFocus
                          />
                        )}
                      </div>
                    </motion.div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center pt-6">
                      <motion.button
                        onClick={() =>
                          setCurrentStep(Math.max(0, currentStep - 1))
                        }
                        disabled={currentStep === 0}
                        className="px-6 py-3 dark:text-gray-400 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                        whileHover={{ scale: currentStep > 0 ? 1.05 : 1 }}
                        whileTap={{ scale: currentStep > 0 ? 0.95 : 1 }}
                      >
                        Back
                      </motion.button>

                      <motion.button
                        onClick={handleNext}
                        disabled={
                          !formData[conversationSteps[currentStep].field] ||
                          isSubmitting
                        }
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 dark:text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold dark:text-white mb-4">
                    Message Sent! 🎉
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thanks for reaching out! I&apos;ll get back to you within 24
                    hours.
                  </p>
                  <motion.button
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
