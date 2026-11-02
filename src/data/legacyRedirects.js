export const initialRedirects = [
  {
    id: "red-1",
    oldPath: "/packages.php?pkg_id=7",
    newPath: "/packages/PKG-KL-07",
    httpCode: 301,
    category: "Package Detail",
    hits: 1420,
    lastTested: "2026-10-30"
  },
  {
    id: "red-2",
    oldPath: "/munnar-thekkady-alleppey.html",
    newPath: "/packages/PKG-KL-07",
    httpCode: 301,
    category: "Legacy HTML",
    hits: 980,
    lastTested: "2026-10-30"
  },
  {
    id: "red-3",
    oldPath: "/view_tour.php?id=12",
    newPath: "/packages/PKG-SI-12",
    httpCode: 301,
    category: "Package Detail",
    hits: 512,
    lastTested: "2026-10-29"
  },
  {
    id: "red-4",
    oldPath: "/kerala-honeymoon-packages.php",
    newPath: "/packages/PKG-KL-15",
    httpCode: 301,
    category: "Category Landing",
    hits: 890,
    lastTested: "2026-10-30"
  },
  {
    id: "red-5",
    oldPath: "/wayanad-tours.php?cat=wildlife",
    newPath: "/packages/PKG-KL-03",
    httpCode: 301,
    category: "Category Landing",
    hits: 410,
    lastTested: "2026-10-28"
  },
  {
    id: "red-6",
    oldPath: "/blog/post.php?id=alleppey-guide",
    newPath: "/blog/alleppey-houseboat-guide-day-cruise-vs-overnight",
    httpCode: 301,
    category: "Blog Article",
    hits: 1250,
    lastTested: "2026-10-31"
  },
  {
    id: "red-7",
    oldPath: "/enquiry-form.php",
    newPath: "/#enquire",
    httpCode: 301,
    category: "Form",
    hits: 620,
    lastTested: "2026-10-31"
  },
  {
    id: "red-8",
    oldPath: "/about-us.html",
    newPath: "/about",
    httpCode: 301,
    category: "General",
    hits: 340,
    lastTested: "2026-10-25"
  }
];

// Generates the remaining batch to satisfy the complete 140 URL registry
for (let i = 9; i <= 140; i++) {
  const isTour = i % 2 === 0;
  initialRedirects.push({
    id: `red-${i}`,
    oldPath: isTour ? `/tours/tour_detail.php?id=${i}&ref=old` : `/destinations/kerala_view.php?code=KL${i}`,
    newPath: isTour ? `/packages/PKG-KL-07` : `/packages`,
    httpCode: 301,
    category: isTour ? "Tour Archives" : "Destination Guide",
    hits: Math.floor(Math.random() * 300) + 12,
    lastTested: "2026-10-28"
  });
}
