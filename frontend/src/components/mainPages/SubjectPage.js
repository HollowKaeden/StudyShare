import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchSubjects } from "../../services/subjectService";
import "./SubjectPage.css";

function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const data = await fetchSubjects();
        setSubjects(data);
      } catch (error) {
        console.error("Ошибка загрузки дисциплин", error);
      }
    };

    loadSubjects();
  }, []);

  return (
    <div className="subjects-container">
      <h2 className="subjects-title">Ваши дисциплины</h2>
      <ul className="subjects-list">
        {subjects.map((subject) => (
          <li key={subject.id} className="subject-item">
            <Link to={`/subjects/${subject.id}`} className="subject-link">
              {subject.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubjectsPage;
