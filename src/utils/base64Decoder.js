const base64Decoder = (base64String) => {
  const buffer = Buffer.from(base64String, 'base64');
  const imageUrl = URL.createObjectURL(new Blob([buffer]));
  return imageUrl;
};

export default base64Decoder;
