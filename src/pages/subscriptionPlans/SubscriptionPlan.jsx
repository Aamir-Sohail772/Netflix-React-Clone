import "./SubscriptionPlan.scss";

const subscriptionOptions = [
  {
    plan: "Free",
    price: "₹0.00/month",
    description: "Access to basic features and content."
  },
  {
    plan: "Basic Plan",
    price: "₹199/month",
    description: "Access to basic features and something extra."
  },
  {
    plan: "Standard Plan",
    price: "₹399/month",
    description: "HD streaming and access to more content."
  },
  {
    plan: "Premium Plan",
    price: "₹599/month",
    description:
      "Ultra HD streaming and access to all content two user can use at one time."
  },
  {
    plan: "Family Plan",
    price: "₹799/month",
    description:
      "Ultra HD streaming and access to all content six user can use at one time."
  }
];

const SubscriptionPlan = () => {
  return (
    <div className="subscription-page">
      <h1>Subscribe to Netflix</h1>
      <div className="subscription-options">
        {subscriptionOptions.map((option, index) => (
          <div className="subscription-option" key={index}>
            <h2>{option.plan}</h2>
            <p>{option.price}</p>
            <p>{option.description}</p>
            <button>Subscribe</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlan;