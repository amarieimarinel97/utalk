package com.utalk.configuration;

import com.github.javafaker.Faker;
import com.utalk.model.Profile;
import com.utalk.model.User;
import com.utalk.repository.DatabaseConnection;
import com.utalk.repository.profile.ProfileRepository;
import com.utalk.repository.user.UserRepository;
import org.springframework.context.annotation.Configuration;

import java.sql.*;
import java.time.ZoneId;
import java.util.*;


@Configuration
public class DatabaseGenerator {
    private static Timestamp timestamp;
    private static Faker faker = new Faker();
    private static Random rand = new Random();


    private static List<Profile> profiles = new ArrayList<>();
    private static List<User> users = new ArrayList<>();
    private static UserRepository userRepository = new UserRepository();
    private static ProfileRepository profileRepository = new ProfileRepository();


    public DatabaseGenerator() {
    }


    public static Profile generateProfile() {
        Profile profile = new Profile();
        Random random=new Random();
        int noOfRandomPhoto = random.nextInt(6)+1;
        profile.setPhoto("profile"+noOfRandomPhoto+".jpg");
        profile.setOccupation(faker.lorem().sentence(1).split(" ", 2)[0]);
        profile.setName(faker.lorem().sentence(2).split(" ", 3)[0] + " " + faker.lorem().sentence(2).split(" ", 3)[1]);
        timestamp = new Timestamp(System.currentTimeMillis());
        profile.setBirthdate(faker.date().birthday().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
        profile.setOccupation(faker.lorem().sentence(1).split(" ", 2)[0]);
        profile.setLocation(faker.lorem().sentence(1).split(" ", 2)[0]);
        return profile;
    }

    public static User generateUser(Integer profile_id) {
        User user = new User();
        user.setPassword(faker.lorem().word());
        String secondWord = faker.lorem().word().toLowerCase();
        secondWord = secondWord.substring(0, 1).toUpperCase() + secondWord.substring(1);
        user.setUsername(faker.lorem().word().toLowerCase() + secondWord);
        user.setProfile_id(profile_id);
        return user;
    }

    public static void generateData(int noOfProfiles) {
        System.out.println("Creating tables and generating Data");

        try (Connection connection = DatabaseConnection.getConnection()) {
            DatabaseConnection.initDatabase(connection);

            userRepository.deleteAll(connection);
            System.out.println("Deleted previous users");

            profileRepository.deleteAll(connection);
            System.out.println("Deleted previous profiles");

            for (int i = 0; i < noOfProfiles; i++) {
                profiles.add(generateProfile());
            }
            for (Profile profile : profiles) {
                profileRepository.create(connection, profile);
                users.add(generateUser(profile.getId()));
                System.out.println("Generated new profile");
            }

        } catch (RuntimeException | SQLException exception) {
            System.out.println("Failed to initialise database profiles table with data: " + exception.getMessage());
        }


        try (Connection connection = DatabaseConnection.getConnection()) {
            for (User user : users) {
                userRepository.create(connection, user);
                System.out.println("Generated new user");
            }

        } catch (RuntimeException | SQLException exception) {
            System.out.println("Failed to initialise database users table with data: " + exception.getMessage());
        }
    }


//
//    private static List<Question> questions;
//    private static List<Type> types;
//    private static List<Discipline> disciplines;
//    private static List<Difficulty> difficulties;
//    private static List<Point> points;
//    private static QuestionRepository questionRepository = new QuestionRepository();
//    private static TestRepository testRepository = new TestRepository();
//    private static DifficultyRepository difficultyRepository = new DifficultyRepository();
//    private static PointRepository pointRepository = new PointRepository();
//    private static TypeRepository typeRepository = new TypeRepository();
//    private static CandidateRepository candidateRepository = new CandidateRepository();
//    private static Timestamp timestamp;
//    private static final Logger logger = LogManager.getLogger(ConfigurationPackage.class);
//    private static Faker faker = new Faker();
//    private static Random rand = new Random();
//
//
//
//    private static List<Type> addTypes(Connection connection) {
//        typeRepository.deleteAll(connection);
//        logger.info("Deleted previous types");
//
//        types = new ArrayList<>();
//        types.add(new Type("Multiple choice", 4));
//        types.add(new Type("Logic", 1));
//        types.add(new Type("Code", 1));
//
//        for (Type type : types) {
//            typeRepository.create(connection, type);
//        }
//        return types;
//    }
//
//    public static Settings generateSettings() {
//        Settings settings = new Settings();
//        settings.setAvailability(24 * 60);
//        settings.setInstructions(faker.lorem().sentence());
//        settings.setSummary(faker.lorem().sentence());
//        settings.setTime(2 * 60);
//        settings.setEmailTemplate("Hello @candidate_name. Exam generated for @discipline. Link expires after @link_availability. Link is @link. Good luck.");
//        return settings;
//    }
//
//    private static void addSettings(Connection connection) {
//        SettingsRepository settingsRepository = new SettingsRepository();
//        settingsRepository.deleteAll(connection);
//        logger.info("Deleted previous settings");
//
//        settingsRepository.create(connection, generateSettings());
//        logger.info("Generated settings");
//    }
//
//    private static List<Discipline> addDisciplines(Connection connection) {
//        CampaignRepository campaignRepository = new CampaignRepository();
//        campaignRepository.deleteAllDisciplineCandidates(connection);
//        logger.info("deleted previous campaign discipline number candidates");
//        DisciplineRepository disciplineRepository = new DisciplineRepository();
//        disciplineRepository.deleteAll(connection);
//        logger.info("Deleted previous disciplines");
//
//        disciplines = new ArrayList<>();
//        disciplines.add(new Discipline("Java"));
//        disciplines.add(new Discipline(".Net"));
//        disciplines.add(new Discipline("Testing"));
//        disciplines.add(new Discipline("AM"));
//
//        for (Discipline discipline : disciplines) {
//            disciplineRepository.create(connection, discipline);
//            logger.info("Discipline created");
//        }
//        return disciplines;
//    }
//
//    private static List<Difficulty> addDifficulties(Connection connection) {
//        difficultyRepository.deleteAll(connection);
//        logger.info("Deleted previous difficulties");
//
//        difficulties = new ArrayList<>();
//        difficulties.add(new Difficulty("Easy", 1));
//        difficulties.add(new Difficulty("Medium", 2));
//        difficulties.add(new Difficulty("Hard", 3));
//
//        for (Difficulty difficulty : difficulties) {
//            difficultyRepository.create(connection, difficulty);
//            logger.info("Difficulty created");
//        }
//        return difficulties;
//    }
//
//    private static List<Point> addPoints(Connection connection) {
//        pointRepository.deleteAll(connection);
//        logger.info("Deleted previous points");
//
//        points = new ArrayList<>();
//        points.add(new Point(1));
//        points.add(new Point(3));
//        points.add(new Point(5));
//
//        for (Point point : points) {
//            pointRepository.create(connection, point);
//            logger.info("Point created");
//        }
//        return points;
//    }
//
//    public static Question generateQuestion() {
//        timestamp = new Timestamp(System.currentTimeMillis());
//
//        Question question = new Question();
//        question.setActive(rand.nextBoolean());
//        question.setContent(faker.lorem().sentence(10));
//
//        int questionType = rand.nextInt(types.size());
//        question.setTypeId(types.get(questionType).getId());
//
//        List<String> answers = new ArrayList<>();
//        for (int answer = 0; answer < types.get(questionType).getNrAnswers(); answer++) {
//            answers.add(faker.lorem().word());
//        }
//
//        question.setChoices(answers);
//        question.setDisciplineId(disciplines.get(rand.nextInt(disciplines.size())).getId());
//        question.setDifficultyId(difficulties.get(rand.nextInt(difficulties.size())).getId());
//        question.setPointId(points.get(rand.nextInt(points.size())).getId());
//
//        question.setCreatedAt(timestamp);
//        question.setUpdatedAt(timestamp);
//        return question;
//    }
//
//    public static Test generateTest() {
//        timestamp = new Timestamp(System.currentTimeMillis());
//        int noOfQuestions = (rand.nextInt(4) + 1) * 10;
//
//        if (noOfQuestions > questions.size())
//            noOfQuestions = questions.size();
//
//        Test test = new Test();
//        test.setName(faker.lorem().sentence(10));
//        test.setDisciplineId(disciplines.get(rand.nextInt(disciplines.size())).getId());
//        Collections.shuffle(questions);
//        test.setIdQuestions(questions.subList(0, noOfQuestions).stream().map(Question::getId).collect(Collectors.toList()));
//
//        test.setCreatedAt(timestamp);
//        test.setUpdatedAt(timestamp);
//        return test;
//    }
//
//    public static Candidate generateCandidate() {
//        String[] testStatuses = {"Ready to send", "Sent", "Ready to grade", "Graded"};
//        String[] universities = {"A.I. Cuza", "Gh. Asachi", "G. Enescu"};
//        timestamp = new Timestamp(System.currentTimeMillis());
//        Candidate candidate = new Candidate();
//        String name = "";
//        name = faker.name().firstName();
//        while (!StringUtils.isAlpha(name)) {
//            name = faker.name().firstName();
//        }
//        candidate.setFirstName(name);
//        name = faker.name().lastName();
//        while (!StringUtils.isAlpha(name)) {
//            name = faker.name().lastName();
//        }
//        candidate.setLastName(name);
//        candidate.setUniversity(universities[rand.nextInt(universities.length)]);
//        candidate.setFaculty(faker.lorem().word());
//        candidate.setStudyYear(rand.nextInt(4) + 1);
//        candidate.setDisciplineId(disciplines.get(rand.nextInt(disciplines.size())).getId());
//        candidate.setEmail(candidate.getFirstName().toLowerCase() + "." + candidate.getLastName().toLowerCase() + "@email.com");
//        candidate.setPhone("0" + (700000000 + rand.nextInt(100000000)));
//        candidate.setStatus(testStatuses[rand.nextInt(testStatuses.length)]);
//        if (candidate.getStatus().equals("Graded")) {
//            candidate.setGrade(rand.nextInt(10) + 1);
//        } else {
//            candidate.setGrade(null);
//        }
//        candidate.setInternalCandidate(rand.nextBoolean());
//        candidate.setAlumni(rand.nextBoolean());
//        candidate.setCreatedAt(timestamp);
//        return candidate;
//    }
//
//    public static Campaign generateCampaign() {
//        timestamp = new Timestamp(System.currentTimeMillis());
//        Campaign campaign = new Campaign();
//        campaign.setName(faker.lorem().sentence(3));
//        campaign.setAccountedPerson(faker.lorem().sentence(10));
//        campaign.setDisciplineCandidates(disciplines
//                .stream()
//                .map(discipline -> new AbstractMap.SimpleEntry<>(discipline.getId(), rand.nextInt(100)))
//                .collect(Collectors.toMap(AbstractMap.SimpleEntry::getKey, AbstractMap.SimpleEntry::getValue))
//        );
//
//        campaign.setStartCampaign(timestamp);
//        campaign.setStartPromoting(timestamp);
//        campaign.setStartTests(timestamp);
//        campaign.setEndTests(timestamp);
//        campaign.setStartInternship(timestamp);
//        campaign.setEndInternship(timestamp);
//        campaign.setCreatedAt(timestamp);
//        campaign.setUpdatedAt(timestamp);
//        return campaign;
//    }
//
//    private static void generateCampaigns(Connection connection, int noOfCampaigns) {
//        CampaignRepository campaignRepository = new CampaignRepository();
//        campaignRepository.deleteAll(connection);
//        logger.info("deleted previous campaigns");
//
//        for (int i = 0; i < noOfCampaigns; i++) {
//            campaignRepository.create(connection, generateCampaign());
//            logger.info("Campaign generated");
//        }
//    }
//
//    public static void generateData(int noOfQuestions, int noOfTests, int noOfCampaigns, int noOfCandidates) {
//        logger.info("Creating tables and generating Data");
//
//        try (Connection connection = DatabaseConnection.getConnection()) {
//            DatabaseConnection.initDatabase(connection);
//
//            testRepository.deleteAllTestQuestions(connection);
//            logger.info("Deleted previous test questions");
//            testRepository.deleteAll(connection);
//            logger.info("Deleted previous tests");
//
//            questionRepository.deleteAll(connection);
//            logger.info("Deleted previous questions");
//
//            types = addTypes(connection);
//            disciplines = addDisciplines(connection);
//            difficulties = addDifficulties(connection);
//            points = addPoints(connection);
//            questions = new ArrayList<>();
//
//            for (int i = 0; i < noOfQuestions; i++) {
//                questions.add(generateQuestion());
//            }
//            for (Question question : questions) {
//                questionRepository.create(connection, question);
//                logger.info("Generated new question");
//            }
//
//            List<Test> tests = new ArrayList<>();
//            for (int i = 0; i < noOfTests; i++) {
//                tests.add(generateTest());
//            }
//            for (Test test : tests) {
//                testRepository.create(connection, test);
//                logger.info("Generated new test");
//            }
//
//            List<Candidate> candidates = new ArrayList<>();
//            for (int i = 0; i < noOfCandidates; i++)
//                candidates.add(generateCandidate());
//
//            for (Candidate candidate : candidates) {
//                candidateRepository.create(connection, candidate);
//                logger.info("Generated new Candidate");
//            }
//
//            Question question = generateQuestion();
//            question.setActive(true);
//            questionRepository.create(connection, question);
//            addSettings(connection);
//            generateCampaigns(connection, noOfCampaigns);
//        } catch (RuntimeException | SQLException exception) {
//            logger.error("Failed to initialise database tables with data: " + exception.getMessage(), exception);
//        }
//    }

    static {
        generateData(50);
    }
}