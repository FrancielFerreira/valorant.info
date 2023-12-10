const Error = ({ error }) => {
  if (!error) return null;
  return (
    <p
      style={{
        color: '#f31',
        background: '#FFCDD2',
        margin: '1rem 0',
        padding: '.2rem',
        textAlign: 'center',
        borderRadius: '4px',
        fontSize: '.875rem',
      }}
    >
      {error}
    </p>
  );
};

export default Error;
