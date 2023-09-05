import React from 'react';

function MBTIForm({ inputValue, setInputValue, handleSubmit, loading }) {
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">Find your dream house</h1>
      <select
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full px-5 py-3 text-gray-700 bg-gray-200 rounded"
      >
        <option value="">Select your MBTI </option>
        <option value="ISTJ">ISTJ</option>
        <option value="ISFJ">ISFJ</option>
        <option value="INFJ">INFJ</option>
        <option value="INTJ">INTJ</option>
        <option value="ISTP">ISTP</option>
        <option value="ISFP">ISFP</option>
        <option value="INFP">INFP</option>
        <option value="INTP">INTP</option>
        <option value="ESTP">ESTP</option>
        <option value="ESFP">ESFP</option>
        <option value="ENFP">ENFP</option>
        <option value="ENTP">ENTP</option>
        <option value="ESTJ">ESTJ</option>
        <option value="ESFJ">ESFJ</option>
        <option value="ENFJ">ENFJ</option>
        <option value="ENTJ">ENTJ</option>  
      </select>
      <button type="submit" className="w-full px-3 py-4 text-white bg-gradient-to-r from-cyan-400 via-green-500 to-cyan-400 rounded-md focus:outline-none" disabled={loading}>
        Submit
      </button>
    </form>
  );
}

export default MBTIForm;