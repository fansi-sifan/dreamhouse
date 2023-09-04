// Replicate API references: https://sdxl.replicate.dev/

import Replicate from 'replicate';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { value } = req.body;

  try {
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

   
    const output = await replicate.run(
      "stability-ai/sdxl:d830ba5dabf8090ec0db6c10fc862c6eb1c929e1a194a5411852d25fd954ac82",
      {
        input: {
          prompt: value,
          image_dimensions: "1024x1024",
          num_inference_steps: 50,
          num_outputs: 1,
          guideance_scale: 20,
          refine: "expert_ensemble_refiner",
          scheduler: "K_EULER" ,
        },
      },
    );


    console.log(output)
    res.status(200).json(output)
    //res.status(200).json([
     //   'https://replicate.delivery/pbxt/neqGIe66cYuPOUPM0JqokMfqsX9CRYgvkycUxyqlCKUjwJchA/out-0.png'
    //  ]
    //);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export default handler;