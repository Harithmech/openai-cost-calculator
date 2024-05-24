export const pricing = {
    language_models: {
        "gpt-4o": {
            input: 0.005,
            output: 0.015,
            description: "Fine-tune GPT-4o with your training data."
        },
    
        "gpt-4-turbo": {
            input: 0.01,
            output: 0.03,
            description: "Fine-tune GPT-4 Turbo with your training data."
        },
    
        "gpt-4": {
            input: 0.03,
            output: 0.06,
            description: "Fine-tune GPT-4 with your training data."
        },
    
        "gpt-3.5-turbo-0125": {
            input: 0.0005,
            output: 0.0015,
            description: "Fine-tune GPT-3.5-Turbo-0125 with your training data."
        },
    
        "gpt-3.5-turbo-instruct": {
            input: 0.0015,
            output: 0.0020,
            description: "Fine-tune GPT-3.5-Turbo-Instruct with your training data."
        }

    },

    assistant_api: {

        code_interpreter: {
            cost_per_session: 0.03,
            description: "Code Interpreter tool for Assistant API.",
        },

        file_search: {
            cost_per_gb_per_day: 0.10,
            description: "File Search tool for Assistant API (1 GB free). GB refers to binary gigabytes (also known as gibibyte), where 1 GB is 2^30 bytes.",
        }

    },

    fine_tuning_models: {

        gpt_3_5_turbo: {
            training: 0.008,
            input_usage: 0.003,
            output_usage: 0.006,
            description: "Fine-tune GPT-3.5 Turbo with your training data."
        },

        davinci_002: {
            training: 0.006,
            input_usage: 0.012,
            output_usage: 0.012,
            description: "Fine-tune the davinci-002 model with your training data."
        },

        babbage_002: {
            training: 0.0004,
            input_usage: 0.0016,
            output_usage: 0.0016,
            description: "Fine-tune the babbage-002 model with your training data."
        }

    },

    embedding_models: {

        "text-embedding-3-small": {
            usage: 0.00002,
            description: "text-embedding-3-small model for advanced search, clustering, topic modeling, and classification functionality."
        },

        "text-embedding-3-large": {
            usage: 0.00013,
            description: "text-embedding-3-large model for advanced search, clustering, topic modeling, and classification functionality."
        },

        "ada v2": {
            usage: 0.00010,
            description: "ada-v2 model for advanced search, clustering, topic modeling, and classification functionality."
        }

    },

    image_models: {

        "Dall-E 3 standard (1024*1024)": {
            resolution: "1024×1024",
            price: 0.040,
            description: "DALL·E 3 standard quality image generation."
        },

        "Dall-E 3 hd (1024*1024)": {
            resolution: "1024×1024",
            price: 0.080,
            description: "DALL·E 3 HD quality image generation."
        },

        "Dsll-E 2 (1024*1024)": {
            resolution: "1024×1024",
            price: 0.020,
            description: "DALL·E 2 optimized for lower cost."
        },

        "Dall-E 2 (512*512)": {
            resolution: "512×512",
            price: 0.018,
            description: "DALL·E 2 optimized for lower cost."
        },

        "Dall-E 2 (256x256)" : {
            resolution: "256×256",
            price: 0.016,
            description: "DALL·E 2 optimized for lower cost."
        }

    },

    audio_models: {
        "Speech-to-Text(Whisper)": {
            price: 0.006,
            unit: "minute",
            description: "Transcribe speech into text and translate many languages into English using Whisper."
        },
        "Text to Speech": {
            price: 0.015 ,
            unit: "1k characters",
            description: "Convert text into spoken audio using text-to-speech (TTS)."
        },
        "Text to Speech (HD)": {
            price: 0.030,
            unit: "1k characters",
            description: "Convert text into spoken audio in HD quality using text-to-speech (TTS) HD."
        }
    },
};



export const categories = {
    language_models: "Language Models",
    assistant_api: "Assistant API",
    fine_tuning_models: "Fine-tuning Models",
    embedding_models: "Embedding Models",
    image_models: "Image Models",
    audio_models: "Audio Models",

};

