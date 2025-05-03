exports.handler = async (event) => {
  console.log("🧪 User attributes received:", JSON.stringify(event.request.userAttributes, null, 2));

  const customClaims = {};
  for (const [key, value] of Object.entries(event.request.userAttributes)) {
    if (key.startsWith("custom:")) {
      customClaims[key] = value;
    }
  }

  event.response = event.response || {};
  event.response.claimsOverrideDetails = {
    claimsToAddOrOverride: customClaims
  };

  return event;
};