const handleDuplicateError = (err: any) => {
  const matchedArray = err.message.match(/"([^"]*)"/);

  return {
    statusCode: 400,
    message: 'Duplicate Entry',
    errorSources: [
      {
        path: '',
        message: `${matchedArray?.[1]} already exists`,
      },
    ],
  };
};

export default handleDuplicateError;