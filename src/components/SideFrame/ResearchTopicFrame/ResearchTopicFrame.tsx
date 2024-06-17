import { researchTopics } from "./ResearchTopics";

const ResearchTopicFrame = ({ topic_index }: { topic_index: number }) => {
  const researchTopic = researchTopics[topic_index];

  return (
    <div>
      <h3>{researchTopic.title}</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: researchTopic.description_augmented,
        }}
      ></p>
    </div>
  );
};

export default ResearchTopicFrame;
