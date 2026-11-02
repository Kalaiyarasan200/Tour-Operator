export const quoteCalculator = {
  // Format currency in Indian standard ₹ (e.g. ₹32,500)
  formatINR(amount) {
    if (isNaN(amount) || amount === null || amount === undefined) return "₹0";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  },

  // Calculate complete quote numbers
  calculateQuote({
    adults = 2,
    childrenWithBed = 0,
    childrenNoBed = 0,
    pricePerPerson = 32500,
    extraBedPrice = 12500,
    childNoBedPrice = 6500,
    addOns = []
  }) {
    const adultSubtotal = adults * pricePerPerson;
    const childBedSubtotal = childrenWithBed * extraBedPrice;
    const childNoBedSubtotal = childrenNoBed * childNoBedPrice;
    
    const addOnsSubtotal = addOns.reduce((sum, item) => sum + (item.selected ? (item.price || 0) : 0), 0);
    
    const subtotal = adultSubtotal + childBedSubtotal + childNoBedSubtotal + addOnsSubtotal;
    
    // Statutory Indian Tour Operator GST (5%)
    const gstRate = 0.05;
    const gstAmount = Math.round(subtotal * gstRate);
    const grandTotal = subtotal + gstAmount;

    return {
      adults,
      childrenWithBed,
      childrenNoBed,
      pricePerPerson,
      extraBedPrice,
      childNoBedPrice,
      adultSubtotal,
      childBedSubtotal,
      childNoBedSubtotal,
      addOnsSubtotal,
      subtotal,
      gstRate: "5%",
      gstAmount,
      grandTotal,
      perAdultTwinSharingBasis: pricePerPerson,
      basisStatement: "Per person on double/twin sharing basis + 5% GST extra"
    };
  }
};
