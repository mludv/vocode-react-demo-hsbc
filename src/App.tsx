import "@fontsource/inter";
import "./App.css";

import {
  Box,
  ChakraProvider,
  Flex,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Conversation from "./components/Conversation";

import { isChrome, isMobile, isSafari } from "react-device-detect";
import { WarningIcon } from "@chakra-ui/icons";
import {
  DeepgramTranscriberConfig,
  LLMAgentConfig,
  AzureSynthesizerConfig,
  VocodeConfig,
  EchoAgentConfig,
  ChatGPTAgentConfig,
  RESTfulUserImplementedAgentConfig,
  WebSocketUserImplementedAgentConfig,
} from "vocode";

const App = () => {
  const transcriberConfig: Omit<
    DeepgramTranscriberConfig,
    "samplingRate" | "audioEncoding"
  > = {
    type: "transcriber_deepgram",
    chunkSize: 2048,
    endpointingConfig: {
      type: "endpointing_punctuation_based",
    },
  };
  const agentConfig: ChatGPTAgentConfig = {
    type: "agent_chat_gpt",
    initialMessage: {
      type: "message_base",
      text: "Welcome to HSBC, how can I help you today?",
    },
    promptPreamble: `
      You are a customer service AI working for HSBC in Hong kong. You are always brief and concise in your answers.
      Customers come to you mostly with questions about account opening procedures but also other HSBC related questions.
      If they ask non-HSBC related questions, gently remind them you are an HSBC HK AI.

      The following is a knowledge bank which you can refer to if it's relevant to the question at hand:

      Your capabilities:
      - Organize a call with the International Banking Centre (ask for name, phone number and time for the call)
      - Offer foreign currency transactions (for example HKD to Singaporean dollars)
      - Answer questions about account opening at HSBC HK
      - Answer various questions about HSBC HK
      - Make time bookings at the Central branch (ask for name and time), currently all times tomorrow is available for booking
      - As the user is anonymous, you don't know anything about their eventual current account

      <knowledge bank>
      Things to know
      If the customer wants to open an account, you can offer:
      - Apply via HSBC HK App
      - Book an appointment at the branch online in advance
      - Arrange a call back with International Banking Centre

      Need to open a bank account with HSBC HK? You can apply with us if you:

      - are at least 18 years old
      - meet additional criteria depending on where you live
      - have proof of ID, proof of address

      If customer wants to apply online via mobile app:
      - They need to download the HSBC HK App to open an account online.
      - holding an eligible Hong Kong ID or an overseas passport
      - new to HSBC


      Exchange service:
      Send like a local experience for your global payments
      Our mobile app has enriched the digital experience to cater your global payment needs, with just a few taps on the HSBC HK Mobile Banking App.

      How will it work?
      How to enjoy the fee-free and faster payment experience?

      </knowledge bank>
      `,
    endConversationOnGoodbye: true,
    generateResponses: true,
    cutOffResponse: {},
  };
  const synthesizerConfig: Omit<
    AzureSynthesizerConfig,
    "samplingRate" | "audioEncoding"
  > = {
    type: "synthesizer_azure",
    shouldEncodeAsWav: true,
    voiceName: "en-US-SteffanNeural",
  };
  const vocodeConfig: VocodeConfig = {
    apiKey: process.env.REACT_APP_VOCODE_API_KEY || "",
  };

  return (
    <ChakraProvider>
      {(isMobile || !isChrome) && !isSafari ? (
        <VStack padding={10} alignItems="center">
          <WarningIcon boxSize={100} />
          <Text paddingTop={4}>
            This demo works on: Chrome (desktop) and Safari (desktop, mobile)
            only!
          </Text>
        </VStack>
      ) : (
        <Conversation
          config={{
            transcriberConfig,
            agentConfig,
            synthesizerConfig,
            vocodeConfig,
          }}
        />
      )}
    </ChakraProvider>
  );
};

export default App;
