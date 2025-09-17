import { GooeyNav } from "./ui/gooey-nav";

export default function BottomNavigation() {
  const items = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/projects" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <div>
      <div>
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={1}
          animationTime={600}
          timeVariance={300}
        />
      </div>
    </div>
  );
}
