import React from "react";
import "./Trainer.css";  // We'll add the styles in Trainer.css

const Trainer = () => {
  const trainers = [
    { id: 1, name: "Trainer 1", title: "Dog Training Techniques", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    { id: 2, name: "Trainer 2", title: "Effective Training Methods", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    { id: 3, name: "Trainer 3", title: "Advanced Dog Commands", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    { id: 4, name: "Trainer 4", title: "Training for Specific Breeds", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    { id: 5, name: "Trainer 5", title: "Positive Reinforcement Training", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    { id: 6, name: "Trainer 6", title: "Training Puppies Effectively", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    { id: 7, name: "Trainer 7", title: "Overcoming Behavior Issues", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    { id: 8, name: "Trainer 8", title: "Dog Obedience Training", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    { id: 9, name: "Trainer 9", title: "Separation Anxiety Solutions", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    { id: 10, name: "Trainer 10", title: "Training for Rescue Dogs", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    { id: 11, name: "Trainer 11", title: "Basic Obedience Training", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    { id: 12, name: "Trainer 12", title: "Trick Training for Dogs", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    { id: 13, name: "Trainer 13", title: "Leash Training for Dogs", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    { id: 14, name: "Trainer 14", title: "Behavior Modification Techniques", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    { id: 15, name: "Trainer 15", title: "Advanced Training Tips", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    //{ id: 16, name: "Trainer 16", title: "Dog Socialization Training", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" }
  ];    

  return (
    <div className="trainer-page">
      <h2 className="text-center mb-5">Professional Dog Training Videos</h2>
      <div className="row">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <iframe
                  width="100%"
                  height="200"
                  src={trainer.videoUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="card-footer text-center">
                <h5>{trainer.name}</h5>
                <p>{trainer.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainer;
