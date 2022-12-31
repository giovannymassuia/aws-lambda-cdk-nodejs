#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AwsLambdaCdkNodejsStack } from "../lib/aws-lambda-cdk-nodejs-stack";

const app = new cdk.App();
new AwsLambdaCdkNodejsStack(app, "AwsLambdaCdkNodejsStack", {});
