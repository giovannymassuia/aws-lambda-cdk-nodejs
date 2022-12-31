import { AppSyncAuthorizerHandler } from "aws-lambda";
import { CognitoJwtVerifier } from "aws-jwt-verify";

export const handler: AppSyncAuthorizerHandler<{
  user_id: string;
  name: string;
  email: string;
}> = async (event, _context) => {
  console.log("AppSyncAuthorizerHandler.event", event);

  if (!event.authorizationToken) {
    return {
      isAuthorized: false,
    };
  }

  // token without barear
  const token = event.authorizationToken.split(" ")[1];

  // Verifier that expects valid access tokens:
  const verifier = CognitoJwtVerifier.create({
    userPoolId: "--",
    tokenUse: "access",
    clientId: "--",
  });

  let authorized = false;

  try {
    const payload = await verifier.verify(token);
    console.log("Token is valid. Payload:", payload);
    authorized = true;
  } catch {
    console.log("Token not valid!");
  }

  return {
    isAuthorized: authorized,
    resolverContext: {
      user_id: "1234567890",
      name: "John Doe",
      email: "john.doe@email.com",
    },
  };
};
