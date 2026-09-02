import { useState } from "react";

import componentsImg from "./assets/components.png";
import { CORE_CONCEPTS } from "./data";
import Header from "./componentes/Header/Header";
import CoreConcept from "./componentes/CoreConcept";
import TabButton from "./componentes/TabButton";
import { EXAMPLES } from "./data";

function App() {
  const [selectedTopic, setSelectedTopic] = useState(); //array of 2 elements

  function handleSelect(selectedButton) {
    //selectedButton => string titles
    //console.log(selectedButton);
    setSelectedTopic(selectedButton);
    console.log(selectedTopic); //THIS WILL LOG THE LAST VALUE NOT THE ACTUAL AFTER THE FUNCTION.
    //THATS BECAUSE REACT WILL RENDER THE APP COMPONENT FIRST AND THEN CHANGE THE SELECTEDTOPIC VALUE
  }

  console.log("APP COMPONENT EXECUTING");
  // OPTION 3
  let tabContent = <p>Please select a topic</p>;
  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map((conceptItem) => (
              <CoreConcept key={conceptItem.title} {...conceptItem} />
            ))}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton
              isSelected={selectedTopic === "components"}
              onSelect={() => handleSelect("components")}
            >
              Componentes
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "jsx"}
              onSelect={() => handleSelect("jsx")}
            >
              JSX
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "props"}
              onSelect={() => handleSelect("props")}
            >
              Props
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "state"}
              onSelect={() => handleSelect("state")}
            >
              State
            </TabButton>
          </menu>

          {/*OPTION 3*/}
          {tabContent}
        </section>
      </main>
    </div>
  );
}

/** OPTION1:
 * {!selectedTopic ? (
            <p>Please select a topic</p>
          ) : (
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </div>
          )}
 *  OPTION 2: 

          {!selectedTopic && <p>Please select a topic</p>}
          {!selectedTopic && (
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </div>
          )}
 */

/*<CoreConcept
              title={CORE_CONCEPTS[0].title}
              description={CORE_CONCEPTS[0].description}
              image={CORE_CONCEPTS[0].image}
            />
            
            <CoreConcept {...CORE_CONCEPTS[2]} />
            <CoreConcept {...CORE_CONCEPTS[3]} />*/
export default App;
