import React from "react";
import "./Trainer.css";  

const Trainer = () => {
  const trainers = [
    { id: 1, name: "Video Training 1", title: "5 Puppy House Training Tips Every Puppy Owner NEEDS To Know", videoUrl:"https://www.youtube.com/embed/JRVCbd4pQOI?si=_MOhAaQOXr6lN5VR" },
    { id: 2, name: "Video Training 2", title: "How to Stop Leash Pulling Now! Pro Tips for Successs", videoUrl: "https://www.youtube.com/embed/tSvfVs4LKyg?si=Xho5kF2D-Orc_Jv2" },
    { id: 3, name: "Video Training 3", title: "Stop Yelling! Do THIS and Your Dog Will Finally Listen!", videoUrl: "https://www.youtube.com/embed/BjYEWjlIS7g?si=CTbvakWY_06ELnC9" },
    { id: 4, name: "Video Training 4", title: "Train your dog to COME to you NO MATTER WHAT", videoUrl: "https://www.youtube.com/embed/DqeXX8wkux0?si=BBGeY5AAgNOb6U-P" },
    { id: 5, name: "Video Training 5", title: "Your Complete Puppy Training Schedule By Age", videoUrl:"https://www.youtube.com/embed/hpb7-dbjVSU?si=KItxgEuO3nFGNC_C"},
    { id: 6, name: "Video Training 6", title: "Separation Anxiety Solutions", videoUrl: "https://www.youtube.com/embed/HTXajoc4a3k" },
    { id: 7, name: "Tips & Tricks 1", title: "The EASIEST way to Teach Your Dog to ROLL OVER! | How to teach your dog to roll over", videoUrl: "https://www.youtube.com/embed/E_gT_snmtP0?si=qzwPKX6r8WgJcfx0"  },
    { id: 8, name: "Tips & Tricks 2", title: "How to Teach Your Dog to Play Dead (Bang! dog trick)", videoUrl: "https://www.youtube.com/embed/IsJ0VdeOJcg?si=aI2tTlg307GIbOti" },
    { id: 9, name: "Tips & Tricks 3", title: "How to Train your Puppy 6 Tricks in 1 Day!", videoUrl: "https://www.youtube.com/embed/PS8sTLqKfA8?si=IQsrobS8Q0leFlPo"  },
  ];    

  return (
    <div className="trainer-page">
      <h2 className="text-center mb-5">Paws-itively Perfect Manners</h2>
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
