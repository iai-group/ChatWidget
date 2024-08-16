from dialoguekit.platforms import FlaskSocketPlatform
from sample_agents.parrot_agent import ParrotAgent

platform = FlaskSocketPlatform(ParrotAgent)
platform.start()
