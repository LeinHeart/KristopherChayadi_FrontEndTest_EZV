import React from 'react';

export const todoListStyles: { [key: string]: React.CSSProperties } = {
  // Styles for Table
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    marginTop: '20px',
  },
  headerRow: {
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'left',
  },
  tableHeader: {
    padding: '12px 15px',
    borderBottom: '2px solid #ddd',
  },
  tableRow: {
    backgroundColor: '#f9f9f9',
    borderBottom: '1px solid #eee',
  },
  tableCell: {
    padding: '10px 15px',
  },

  // Styles for Status Badge
  statusCell: {
    textAlign: 'center',
  },
  statusBadge: {
    color: 'white',
    padding: '4px 10px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '12px',
    display: 'inline-block',
  },

  // Styles for Pagination
  paginationContainer: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
  },
  paginationButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#0070f3',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  // Style for Fetching indicator
  fetchingIndicator: {
    color: 'blue', 
    fontSize: '14px', 
    marginLeft: '10px'
  }
};