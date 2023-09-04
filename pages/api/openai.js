import OpenAI from "openai";

const openai = new OpenAI();

const handler = async (req, res) => {
    
    const { value } = req.body;
  
    try {
      const completion = await openai.completions.create({
        model: "text-davinci-003",  
        prompt: `You are a architect designer. Your client MBTI is: ${value}
        Generate keywords for their dream house, including details on the housing size, architectural style, materials, color, lighting, design inspirations,etc.`,
        max_tokens: 100,
        temperature: 0.9,
    });
  
      console.log(completion)
      res.status(200).json(completion)
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
