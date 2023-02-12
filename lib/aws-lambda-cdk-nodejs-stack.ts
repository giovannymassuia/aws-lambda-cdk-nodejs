import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { readFileSync } from "fs";

export class AwsLambdaCdkNodejsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getNotesFunction2 = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "getNotes2",
      {
        entry: "app/infra/functions/getNotesHandler2.ts",
        handler: "handler",
        events: [
          new cdk.aws_lambda_event_sources.ApiEventSource("GET", "/notes2", {}),
        ],
      }
    );

    // const getNotesFunction = new cdk.aws_lambda_nodejs.NodejsFunction(
    //   this,
    //   "getNotes",
    //   {
    //     entry: "app/infra/functions/getNotesHandler.ts",
    //     handler: "handler",
    //     // bundling: {
    //     //   minify: true,
    //     // },
    //   }
    // );

    // const addNoteFunction = new cdk.aws_lambda_nodejs.NodejsFunction(
    //   this,
    //   "addNote",
    //   {
    //     entry: "app/infra/functions/addNoteHandler.ts",
    //     handler: "handler",
    //   }
    // );

    // // api gateway
    // const notesApi = new cdk.aws_apigateway.RestApi(this, "notesApi", {
    //   restApiName: "Notes Service",
    //   description: "This service serves notes.",
    // });

    // // rest api gateway cognito authorizer
    // const cognitoAuthorizer = new cdk.aws_apigateway.CognitoUserPoolsAuthorizer(
    //   this,
    //   "cognitoAuthorizer",
    //   {
    //     cognitoUserPools: [
    //       cdk.aws_cognito.UserPool.fromUserPoolId(this, "userPool", "---"),
    //     ],
    //   }
    // );

    // const notes = notesApi.root.addResource("notes");
    // notes.addMethod(
    //   "GET",
    //   new cdk.aws_apigateway.LambdaIntegration(getNotesFunction),
    //   {
    //     authorizer: cognitoAuthorizer,
    //     authorizationType: cdk.aws_apigateway.AuthorizationType.COGNITO,
    //     authorizationScopes: [
    //       "aws.cognito.signin.user.admin",
    //       "phone",
    //       "openid",
    //       "profile",
    //       "email",
    //     ],
    //   }
    // );

    // const addNote = notes.addResource("{dayId}");
    // addNote.addMethod(
    //   "POST",
    //   new cdk.aws_apigateway.LambdaIntegration(addNoteFunction)
    // );

    // const notesApiUrl = notesApi.url;
    // new cdk.CfnOutput(this, "notesApiUrl", {
    //   value: notesApiUrl,
    // });

    // const notesApiId = notesApi.restApiId;
    // new cdk.CfnOutput(this, "notesApiId", {
    //   value: notesApiId,
    // });

    // // app sync v2
    // const authGraphqlFunction = new cdk.aws_lambda_nodejs.NodejsFunction(
    //   this,
    //   "authGraphql",
    //   {
    //     entry: "app/infra/functions/graphqlAuthHandler.ts",
    //     handler: "handler",
    //   }
    // );

    // // aws lambda authorizer
    // // const api = new cdk.aws_appsync.CfnGraphQLApi(this, "Api", {
    // //   authenticationType: "AWS_LAMBDA",
    // //   name: "notes-api",
    // //   lambdaAuthorizerConfig: {
    // //     authorizerResultTtlInSeconds: 5,
    // //     authorizerUri: authGraphqlFunction.functionArn,
    // //   },
    // //   additionalAuthenticationProviders: [
    // //     {
    // //       authenticationType: "API_KEY",
    // //     },
    // //   ],
    // // });

    // // aws cognito user pools authorizer
    // const api = new cdk.aws_appsync.CfnGraphQLApi(this, "Api", {
    //   authenticationType: "AMAZON_COGNITO_USER_POOLS",
    //   name: "notes-api",
    //   userPoolConfig: {
    //     awsRegion: "us-east-1",
    //     defaultAction: "ALLOW",
    //     userPoolId: "---",
    //   },
    //   additionalAuthenticationProviders: [
    //     {
    //       authenticationType: "API_KEY",
    //     },
    //   ],
    // });

    // const allowAppSyncPolicyStatement = new cdk.aws_iam.PolicyStatement({
    //   effect: cdk.aws_iam.Effect.ALLOW,
    //   actions: ["lambda:InvokeFunction"],
    //   resources: [
    //     "arn:aws:iam::*:role/aws-service-role/appsync.amazonaws.com/AWSServiceRoleForAppSync",
    //   ],
    // });

    // authGraphqlFunction.addToRolePolicy(allowAppSyncPolicyStatement);
    // authGraphqlFunction.addPermission("AllowAppSyncInvoke", {
    //   principal: new cdk.aws_iam.ServicePrincipal("appsync.amazonaws.com"),
    //   action: "lambda:InvokeFunction",
    // });

    // const apiKey = new cdk.aws_appsync.CfnApiKey(this, "ApiKey2", {
    //   apiId: api.attrApiId,
    // });

    // const schema = new cdk.aws_appsync.CfnGraphQLSchema(this, "Schema", {
    //   apiId: api.attrApiId,
    //   definition: readFileSync("app/infra/graphql/schema.graphql").toString(),
    // });

    // const getNotesFunctionGraphQl = new cdk.aws_lambda_nodejs.NodejsFunction(
    //   this,
    //   "getNotesGraphql",
    //   {
    //     entry: "app/infra/functions/getNotesGraphqlHandler.ts",
    //     handler: "handler",
    //   }
    // );

    // const invokeLambdaRole = new cdk.aws_iam.Role(this, "InvokeLambdaRole", {
    //   assumedBy: new cdk.aws_iam.ServicePrincipal("appsync.amazonaws.com"),
    // });
    // invokeLambdaRole.addToPolicy(
    //   new cdk.aws_iam.PolicyStatement({
    //     effect: cdk.aws_iam.Effect.ALLOW,
    //     actions: ["lambda:InvokeFunction"],
    //     resources: [getNotesFunctionGraphQl.functionArn],
    //   })
    // );

    // const dataSource = new cdk.aws_appsync.CfnDataSource(this, "DataSource", {
    //   apiId: api.attrApiId,
    //   name: "notes",
    //   type: "AWS_LAMBDA",
    //   lambdaConfig: {
    //     lambdaFunctionArn: getNotesFunctionGraphQl.functionArn,
    //   },
    //   serviceRoleArn: invokeLambdaRole.roleArn,
    // });

    // const resolver = new cdk.aws_appsync.CfnResolver(this, "Resolver", {
    //   apiId: api.attrApiId,
    //   typeName: "Query",
    //   fieldName: "getNotes",
    //   dataSourceName: dataSource.name,
    // });
    // resolver.addDependsOn(schema);

    // // output graphql url
    // const graphqlUrl = api.attrGraphQlUrl;
    // new cdk.CfnOutput(this, "graphqlUrl", {
    //   value: graphqlUrl,
    // });
  }
}
