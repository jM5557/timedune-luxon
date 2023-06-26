"use client";

import React, { useState } from "react";
import { TimerEvent } from "@prisma/client";

const CreatePage = (): JSX.Element => {
      const [formValues, setFormValues] = useState({
        timestamp: '',
        timezoneId: 0,
        categoryId: 0,
        title: 'My Event',
        summary: '',
        endingPhraseId: 0,
        isPrivate: false,
        relevantLink: '',
      });
    
      const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
    
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: newValue,
        }));
      };
    
      const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        try {
          const response = await fetch("http://localhost:3000/api/timerevents", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
          });
    
          if (!response.ok) {
            throw new Error('Failed to submit TimerEvent');
          }
    
          const createdTimerEvent = await response.json();
          console.log('TimerEvent submitted:', createdTimerEvent);
    
          // Reset the form after successful submission
          setFormValues({
            timestamp: '',
            timezoneId: 0,
            categoryId: 0,
            title: 'My Event',
            summary: '',
            endingPhraseId: 0,
            isPrivate: false,
            relevantLink: '',
          });
        } catch (error) {
          console.error('Error submitting TimerEvent:', error);
        }
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="timestamp">Timestamp:</label>
            <input
              type="datetime-local"
              id="timestamp"
              name="timestamp"
              value={formValues.timestamp}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="timezoneId">Timezone ID:</label>
            <input
              type="number"
              id="timezoneId"
              name="timezoneId"
              value={formValues.timezoneId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="categoryId">Category ID:</label>
            <input
              type="number"
              id="categoryId"
              name="categoryId"
              value={formValues.categoryId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="summary">Summary:</label>
            <textarea
              id="summary"
              name="summary"
              value={formValues.summary}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="endingPhraseId">Ending Phrase ID:</label>
            <input
              type="number"
              id="endingPhraseId"
              name="endingPhraseId"
              value={formValues.endingPhraseId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="isPrivate">Is Private:</label>
            <input
              type="checkbox"
              id="isPrivate"
              name="isPrivate"
              checked={formValues.isPrivate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="relevantLink">Relevant Link:</label>
            <input
              type="url"
              id="relevantLink"
              name="relevantLink"
              value={formValues.relevantLink}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      );
    };

export default CreatePage;
