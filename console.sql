use phamonis

CREATE TABLE "user" (
	"id" int IDENTITY(1,1) PRIMARY KEY,
	"name" VARCHAR(100) NOT NULL,
	"email" VARCHAR(100) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"phone" VARCHAR(100),
	"role" TINYINT NOT NULL,
	"points" INT DEFAULT '100',
	"createdAt" DATETIME DEFAULT GETDATE()
);

CREATE TABLE "doctor" (
	"id" INT NOT NULL FOREIGN KEY REFERENCES [user],
	"position" VARCHAR(255),
	"hospitalId" INT
);

CREATE TABLE "patient" (
	"id" INT NOT NULL FOREIGN KEY REFERENCES [user],
	"address" VARCHAR(255),
	"bloodType" VARCHAR(255)
);

CREATE TABLE "nurse" (
	"id" INT NOT NULL FOREIGN KEY REFERENCES [user],
	"experience" VARCHAR,
);

CREATE TABLE "services" (
	"doctorId" INT NOT NULL FOREIGN KEY REFERENCES [user],
	"service" VARCHAR(255)
);

CREATE TABLE "qualification" (
	"doctorId" INT NOT NULL FOREIGN KEY REFERENCES [user],
	"degree" VARCHAR(255) NOT NULL,
	"grade" VARCHAR(50) NOT NULL,
	"institution" VARCHAR(256)
);

CREATE TABLE "hospital" (
	"id" int IDENTITY(1,1) PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"phone" VARCHAR(100) NOT NULL,
	"address" VARCHAR(255) NOT NULL
);

CREATE TABLE "card" (
	"userId" INT NOT NULL FOREIGN KEY REFERENCES [user],
	"holderName" VARCHAR(255) NOT NULL,
	"expiryYear" VARCHAR(2) NOT NULL,
	"expiryMonth" VARCHAR(2) NOT NULL,
	"csv" int,
	"cardNumber" int,
	"type" varchar(10)
);

CREATE TABLE "transaction" (
	"id" INT IDENTITY(1,1) PRIMARY KEY,
	"sender" INT NOT NULL FOREIGN KEY REFERENCES [user],
	"receiver" INT NOT NULL FOREIGN KEY REFERENCES [user],
	"description" VARCHAR(255) NOT NULL,
	"status" TINYINT DEFAULT 0
);

CREATE TABLE "dispute" (
	"id" INT IDENTITY(1,1) PRIMARY KEY,
	"userId" INT NOT NULL FOREIGN KEY REFERENCES [user],
	"transactionId" INT NOT NULL FOREIGN KEY REFERENCES [transaction],
	"dispute" VARCHAR(255) NOT NULL,
  "createdAt" DATETIME DEFAULT GETDATE(),
	"status" TINYINT DEFAULT 0
);

CREATE TABLE "diagnosis" (
	"userId" INT NOT NULL FOREIGN KEY REFERENCES [user],
	"doctorId" INT NOT NULL FOREIGN KEY REFERENCES [user],
	"symptom" VARCHAR(255),
  "occurrence" INT,
  "report" TINYINT default 0,
  "reportPath" VARCHAR(100),
  "description" VARCHAR(255),
  "createdAt" DATETIME DEFAULT GETDATE(),
  "updatedAt" DATETIME DEFAULT GETDATE()
);

CREATE TABLE "notification" (
	"userId" INT NOT NULL FOREIGN KEY REFERENCES [user],
	"email" VARCHAR(255),
  "message" VARCHAR(255),
  "read" TINYINT DEFAULT 0,
  "createdAt" DATETIME DEFAULT GETDATE(),
  "updatedAt" DATETIME DEFAULT GETDATE()
);

CREATE TABLE "doctorPatientRecord" (
	"patientId" INT NOT NULL FOREIGN KEY REFERENCES [user],
	"doctorId" INT NOT NULL FOREIGN KEY REFERENCES [user],
  "description" VARCHAR(255),
  "createdAt" DATETIME DEFAULT GETDATE(),
  "updatedAt" DATETIME DEFAULT GETDATE()
);

CREATE TABLE "nursePatientRecord" (
	"patientId" INT NOT NULL FOREIGN KEY REFERENCES [user],
	"nurseId" INT NOT NULL FOREIGN KEY REFERENCES [user],
  "description" VARCHAR(255)
);

CREATE TABLE "poseSystem" (
  "doctorId"  INT FOREIGN KEY REFERENCES [user],
  "patientId" INT FOREIGN KEY REFERENCES [user],
  "raspId" INT FOREIGN KEY REFERENCES [raspberryPi],
  "path" VARCHAR(100),
  "createdAt" DATETIME DEFAULT GETDATE(),
  "deleted" TINYINT DEFAULT 0
);

CREATE TABLE "raspberryPi" (
  "id" INT IDENTITY(1,1) PRIMARY KEY,
  "accessToken" VARCHAR(255),
  "registrationNo" VARCHAR(255),
  "password" VARCHAR(255),
  "status" TINYINT DEFAULT 0,
  "createdAt" DATETIME DEFAULT GETDATE(),
  "updatedAt" DATETIME DEFAULT GETDATE()
);

CREATE TABLE "emergencyState" (
  "id" INT IDENTITY(1,1) PRIMARY KEY,
  "state" VARCHAR(255),
  "address" VARCHAR(255),
  "phoneNumber" VARCHAR(100),
  "driverNumber" VARCHAR(100),
  "status" VARCHAR(100),
  "requestBy"  INT FOREIGN KEY REFERENCES [user],
  "requestFor" INT FOREIGN KEY REFERENCES [user],
  "createdAt" DATETIME DEFAULT GETDATE(),
  "updatedAt" DATETIME DEFAULT GETDATE()
);