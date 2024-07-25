-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2024 at 11:31 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shadala`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_type_tbl`
--

CREATE TABLE `account_type_tbl` (
  `AccountTypeID` int(11) NOT NULL,
  `AccountType` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account_type_tbl`
--

INSERT INTO `account_type_tbl` (`AccountTypeID`, `AccountType`) VALUES
(1, 'Admin'),
(2, 'Customer'),
(3, 'Driver');

-- --------------------------------------------------------

--
-- Table structure for table `admin_tbl`
--

CREATE TABLE `admin_tbl` (
  `AdminID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `FirstName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `RecordStatus` varchar(255) DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_tbl`
--

INSERT INTO `admin_tbl` (`AdminID`, `UserID`, `FirstName`, `LastName`, `RecordStatus`) VALUES
(1, 18, 'Rose Ann', 'Park', 'Active'),
(3, 127, 'admin', 'admins', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `archived_booking_tbl`
--

CREATE TABLE `archived_booking_tbl` (
  `ArchiveID` int(100) NOT NULL,
  `BookingID` int(100) NOT NULL,
  `CustomerID` int(100) NOT NULL,
  `TrackingNumber` varchar(100) NOT NULL,
  `ReceiverName` varchar(100) NOT NULL,
  `ParcelDestination` varchar(100) NOT NULL,
  `SenderName` varchar(100) NOT NULL,
  `ParcelOrigin` varchar(100) NOT NULL,
  `VehicleType` varchar(100) NOT NULL,
  `BookingDate` date NOT NULL,
  `BookingStatus` varchar(100) NOT NULL,
  `AssignedDriver` varchar(100) NOT NULL,
  `TotalPrice` varchar(100) NOT NULL,
  `ProofOfDelivery` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `archived_complaint_tbl`
--

CREATE TABLE `archived_complaint_tbl` (
  `ArchiveID` int(11) NOT NULL,
  `ComplaintID` varchar(255) NOT NULL DEFAULT '''Active''',
  `BookingID` int(11) DEFAULT NULL,
  `Name` varchar(100) NOT NULL,
  `TrackingNumber` varchar(50) DEFAULT NULL,
  `TypeOfComplaint` varchar(100) DEFAULT NULL,
  `ProofAttachment` varchar(255) DEFAULT NULL,
  `ComplaintDate` date DEFAULT NULL,
  `ComplaintDescription` varchar(999) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `archived_driver_tbl`
--

CREATE TABLE `archived_driver_tbl` (
  `ArchiveID` int(11) NOT NULL,
  `DriverID` int(11) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `VehicleType` varchar(50) DEFAULT NULL,
  `LicenseNumber` varchar(50) DEFAULT NULL,
  `PlateNumber` varchar(50) DEFAULT NULL,
  `EmailAddress` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `DateCreated` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `archived_users_tbl`
--

CREATE TABLE `archived_users_tbl` (
  `ArchivedID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `AccountType` varchar(50) DEFAULT NULL,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `EmailAddress` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `DateCreated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `archived_vehicle_tbl`
--

CREATE TABLE `archived_vehicle_tbl` (
  `ArchiveID` int(11) NOT NULL,
  `VehicleID` int(11) DEFAULT NULL,
  `DriverID` int(11) DEFAULT NULL,
  `PlateNumber` varchar(20) DEFAULT NULL,
  `VehicleModel` varchar(30) DEFAULT NULL,
  `VehicleColor` varchar(30) DEFAULT NULL,
  `VehicleType` varchar(30) DEFAULT NULL,
  `ValidLicenseImg` varchar(255) DEFAULT NULL,
  `OfficialReceiptImg` varchar(255) DEFAULT NULL,
  `CertificateOfRegImg` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `booking_tbl`
--

CREATE TABLE `booking_tbl` (
  `BookingID` int(11) NOT NULL,
  `CustomerID` int(11) DEFAULT NULL,
  `TrackingNumber` varchar(255) DEFAULT NULL,
  `ParcelDestination` varchar(255) DEFAULT NULL,
  `ParcelOrigin` varchar(255) DEFAULT NULL,
  `VehicleType` varchar(50) DEFAULT NULL,
  `BookingDate` date DEFAULT NULL,
  `BookingStatus` varchar(50) DEFAULT NULL,
  `AssignedDriver` varchar(100) DEFAULT NULL,
  `TotalPrice` decimal(10,2) DEFAULT NULL,
  `ProofOfDelivery` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking_tbl`
--

INSERT INTO `booking_tbl` (`BookingID`, `CustomerID`, `TrackingNumber`, `ParcelDestination`, `ParcelOrigin`, `VehicleType`, `BookingDate`, `BookingStatus`, `AssignedDriver`, `TotalPrice`, `ProofOfDelivery`) VALUES
(27, 29, 'SHDCVTW5LZ7', 'Kalayaan Avenue, Quezon City', '678 J.P. Rizal Street, Poblacion, Makati City, Metro Manila', 'Motorcycle', '2024-05-20', 'For Pickup', '35', '441.26', NULL),
(28, 24, 'SHDP765GQ9X', 'SM Aura', '789 E. Rodriguez Sr. Avenue, New Manila, Quezon City', '1000kg Small Truck', '2024-05-20', 'Pending', 'No Driver Assigned', '2798.05', NULL),
(29, 24, 'SHD2OJPITM4', 'Glorietta 3, Ayala Center, Makati', '789 E. Rodriguez Sr. Avenue, New Manila, Quezon City', '600kg MPV', '2024-05-20', 'For Pickup', '35', '1716.92', NULL),
(31, 24, 'SHD5JOF5N0H', 'Tivoli Garden Residences, Mandaluyong', '123 Balete Drive, New Manila, Quezon City, Metro Manila', '600kg MPV', '2024-05-20', 'Pending', 'No Driver Assigned', '1115.81', NULL),
(33, 24, 'SHDSRA16II9', '456 Taft Avenue, Ermita, Manila, Metro Manila', '789 Boni Avenue, Mandaluyong City, Metro Manila', 'Motorcycle', '2024-05-20', 'Pending', 'No Driver Assigned', '337.42', NULL),
(34, 24, 'SHDO7R1FZCD', '789 Boni Avenue, Mandaluyong City, Metro Manila', '456 Taft Avenue, Ermita, Manila, Metro Manila', '1000kg Small Truck', '2024-05-20', 'Pending', 'No Driver Assigned', '2134.71', NULL),
(35, 24, 'SHD8N1LQH77', 'Ayala Malls Manila Bay, Parañaque', '101 Kalayaan Avenue, Diliman, Quezon City, Metro Manila', '200kg Sedan', '2024-05-20', 'Pending', 'No Driver Assigned', '1532.20', NULL),
(36, 24, 'SHDOKTLMARF', 'Mango Street, Bel-Air Village, Makati', '234 Sen. Gil Puyat Avenue, Makati City, Metro Manila', '600kg MPV', '2024-05-20', 'For Pickup', '35', '3370.83', NULL),
(37, 39, 'SHD5FSUWRB0', 'Adamson University', 'SM Mall of Asia', 'Motorcycle', '2024-05-21', 'For Pickup', '35', '228.00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `complaint_tbl`
--

CREATE TABLE `complaint_tbl` (
  `ComplaintID` int(11) NOT NULL,
  `BookingID` int(11) DEFAULT NULL,
  `CustomerID` int(11) DEFAULT NULL,
  `TrackingNumber` varchar(50) DEFAULT NULL,
  `TypeOfComplaint` varchar(100) DEFAULT NULL,
  `ProofAttachment` varchar(255) DEFAULT NULL,
  `ComplaintDate` date DEFAULT NULL,
  `ComplaintDescription` varchar(999) DEFAULT NULL,
  `ComplaintStatus` varchar(20) DEFAULT NULL,
  `Feedback` varchar(255) DEFAULT 'No Feedback Yet'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complaint_tbl`
--

INSERT INTO `complaint_tbl` (`ComplaintID`, `BookingID`, `CustomerID`, `TrackingNumber`, `TypeOfComplaint`, `ProofAttachment`, `ComplaintDate`, `ComplaintDescription`, `ComplaintStatus`, `Feedback`) VALUES
(12, 25, 24, 'SHDDCWU5UE5', 'Missing or Incomplete Items', '1716215946122_what-are-company-formation-documents-1.jpg', '2024-05-20', 'Unfortunately, upon receipt of the delivery containing the stack of legal documents, we discovered that a significant portion of the documents was missing. The package arrived with evident signs of tampering, and upon inspection, it was evident that several crucial documents were absent from the bundle.', 'Pending', 'No Feedback Yet'),
(13, 26, 24, 'SHDSFYXFKA9', 'Damaged Items', '1716215961507_images.jpg', '2024-05-20', 'I am filing a complaint regarding the delivery of the 15-inch MacBook Pro. Unfortunately, upon unpacking the item by the person who received it, they discovered substantial damage to the laptop. The screen is cracked, and there are visible dents on the casing. The damage appears to have occurred during transit, as the packaging showed signs of mishandling.', 'Pending', 'No Feedback Yet'),
(14, 30, 24, 'SHDBRORB1GU', 'Damaged Items', '1716215993204_images (1).jpg', '2024-05-20', 'Upon delivery, we observed extensive damage to the exterior casing of the refrigerator, with deep scratches and dents on multiple sides. The refrigerator door handle was also broken, making it difficult to open and close the door properly. This is unacceptable as we invested a lot for this refrigerator.', 'Pending', 'No Feedback Yet'),
(15, 31, 24, 'SHD5JOF5N0H', 'Lost Items', '1716216030169_7d1c1087764c2240ee16a468525d775a.jpg', '2024-05-20', 'Hi, this is regarding the recent delivery of a box of designer clothes. Upon receiving and opening the package, the receiver found that several items listed on the delivery invoice were not present. The box was supposed to include 10 designer dresses, but only 6 were inside. The missing dresses are high-value items and their absence is unacceptable. It seems that these items were lost during transit. This situation is highly distressing as the dresses were intended for an upcoming event. I request immediate action to investigate the loss and either recover the missing items or provide compensation.', 'Pending', 'No Feedback Yet'),
(16, 32, 24, 'SHDJ1J08UVU', 'Missing or Incomplete Items', '1716216056307_textbooks_for_cheap_1700640490_6ca7bc6a_progressive.jpg', '2024-05-20', 'I am filing a complaint regarding the delivery of the box of textbooks. We found out that one of the textbooks was missing from the box, despite being listed in the delivery details. This is concerning as the textbooks are essential for academic purposes, and their incomplete state hinders the students\' ability to study effectively.', 'Pending', 'No Feedback Yet'),
(17, 34, 24, 'SHDO7R1FZCD', 'Missing or Incomplete Items', '1716216085471_golf_clubs_1702003721_86299623_progressive.jpg', '2024-05-20', 'I am submitting a complaint regarding the delivery of the set of golf clubs. Upon inspection of the package, we discovered that one of the golf clubs was missing from the set, despite being listed in the delivery invoice. ', 'Pending', 'No Feedback Yet');

-- --------------------------------------------------------

--
-- Table structure for table `customer_tbl`
--

CREATE TABLE `customer_tbl` (
  `CustomerID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `FirstName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `HomeAddress` varchar(100) NOT NULL,
  `ContactNumber` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_tbl`
--

INSERT INTO `customer_tbl` (`CustomerID`, `UserID`, `FirstName`, `LastName`, `HomeAddress`, `ContactNumber`) VALUES
(24, 97, 'Stefano', 'Medina', 'San Pedro, Laguna', '09876543210'),
(26, 99, 'Marie', 'Gerali', 'Poblacion, Makati', '09784512306'),
(28, 101, 'Maria', 'Cruz', 'Quezon City, Metro Manila', '09367890123'),
(29, 102, 'Florence', 'Vermosa', 'Malate, Manila', '09478901234'),
(30, 103, 'Anna', 'Reyes', 'Roxas Boulevard, Pasay City', '09560123456'),
(31, 104, 'Elisia', 'Santos', 'New Manila, Quezon City', '09123456789'),
(32, 105, 'Adrian', 'Aquino', 'Quezon City, Metro Manila', '09568623454'),
(33, 107, 'Lina', 'Garcia', 'Mandaluyong City, Metro Manila', '09175432187'),
(35, 109, 'Junia', 'Garcia', 'Manila, Metro Manila', '09398761234'),
(39, 128, 'Maria', 'Santos', '123 Acacia Street, Quezon City', '9171234567');

-- --------------------------------------------------------

--
-- Table structure for table `driver_tbl`
--

CREATE TABLE `driver_tbl` (
  `DriverID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `VehicleID` int(11) DEFAULT NULL,
  `FirstName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `HomeAddress` varchar(100) NOT NULL,
  `ContactNumber` varchar(20) DEFAULT NULL,
  `LicenseNumber` varchar(50) DEFAULT NULL,
  `ExpirationDate` date DEFAULT NULL,
  `CurrentStatus` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `driver_tbl`
--

INSERT INTO `driver_tbl` (`DriverID`, `UserID`, `VehicleID`, `FirstName`, `LastName`, `HomeAddress`, `ContactNumber`, `LicenseNumber`, `ExpirationDate`, `CurrentStatus`) VALUES
(35, 106, 72, 'John', 'Doe', 'Novaliches, Quezon City', '09191610289', 'D01-24-987654', '2029-08-13', 'Available'),
(36, 113, 73, 'Unique', 'Salonga', 'Rodriguez Avenue, Pasig City', '09238901234', 'D05-08-345678', '2027-05-28', 'Available'),
(37, 114, 74, 'Juan', 'Dela Cruz', 'Barangay Palanan, Makati City', '09356789012', 'D07-15-901234', '2026-09-15', 'Newly Registered'),
(38, 115, 75, 'Samuel', 'Deypalubos', 'Malate, Manila', '09462345678', 'D03-21-567890', '2025-04-07', 'Not Available'),
(40, 117, 77, 'Zild', 'Benitez', 'Esperanza Street, Makati City', '09272345678', 'D06-26-234567', '2027-05-28', 'Newly Registered'),
(42, 119, 79, 'Blaster', 'Silonga', 'EDSA, Mandaluyong Cit', '09454567890', 'D08-28-456788', '2029-08-12', 'Newly Registered'),
(43, 120, 80, 'Felix', 'Domingo', ' Barangay Kapitolyo, Pasig City', '09555678901', 'D09-29-567890', '2030-11-05', 'Newly Registered'),
(44, 121, 81, 'Ricardo', 'Salvador', 'Ermita, Manila', '09776789012', 'D01-30-678901', '2031-04-18', 'Not Available'),
(45, 122, 82, 'Nano', 'Yu', 'Barangay Ugong, Pasig City', '09327890123', 'D02-31-789023', '2026-07-21', 'Not Available'),
(49, 126, 86, 'Marco', 'Nustre', 'Chino Roces Avenue, Makati City', '09508764312', 'D08-35-123467', '2031-12-17', 'Newly Registered');

-- --------------------------------------------------------

--
-- Table structure for table `receiver_tbl`
--

CREATE TABLE `receiver_tbl` (
  `ReceiverID` int(11) NOT NULL,
  `BookingID` int(11) DEFAULT NULL,
  `ReceiverName` varchar(100) DEFAULT NULL,
  `ReceiverContactNum` varchar(20) DEFAULT NULL,
  `ReceiverBlockNum` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receiver_tbl`
--

INSERT INTO `receiver_tbl` (`ReceiverID`, `BookingID`, `ReceiverName`, `ReceiverContactNum`, `ReceiverBlockNum`) VALUES
(27, 27, 'Josefa Tan', '9207432951', ''),
(28, 28, 'Mark Lee', '9213846729', ''),
(29, 29, 'Aimee Villanueva', '9176254839', ''),
(31, 31, 'Carol Uy', '9184739628', ''),
(33, 33, 'Junia Garcia', '9398761234', ''),
(34, 34, 'Lina Garcia', '9175432187', ''),
(35, 35, 'Fred Lim', '9203147695', ''),
(36, 36, 'Paulo Manaloto', '9216473982', ''),
(37, 37, 'Patricia Sugapong', '9548945326', 'SV Gate');

-- --------------------------------------------------------

--
-- Table structure for table `sender_tbl`
--

CREATE TABLE `sender_tbl` (
  `SenderID` int(11) NOT NULL,
  `BookingID` int(11) DEFAULT NULL,
  `SenderName` varchar(100) DEFAULT NULL,
  `SenderContactNum` varchar(20) DEFAULT NULL,
  `SenderBlockNum` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sender_tbl`
--

INSERT INTO `sender_tbl` (`SenderID`, `BookingID`, `SenderName`, `SenderContactNum`, `SenderBlockNum`) VALUES
(27, 27, 'Carlo Bautista', '9613459876', ''),
(28, 28, 'Elisia Santos', '9123456789', ''),
(29, 29, 'Elisia Santos', '9123456789', ''),
(31, 31, 'Jose Marcelito', '9286547391', ''),
(33, 33, 'Lina Garcia', '9175432187', ''),
(34, 34, 'Junia Garcia', '9398761234', ''),
(35, 35, 'Caroline Torres', '9472315678', ''),
(36, 36, 'Miguel Fernandez', '9567894321', ''),
(37, 37, 'Ashley Radovan', '95784561235', 'Food Court');

-- --------------------------------------------------------

--
-- Table structure for table `user_details_tbl`
--

CREATE TABLE `user_details_tbl` (
  `UserID` int(11) NOT NULL,
  `AccountTypeID` int(11) DEFAULT NULL,
  `EmailAddress` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `DateCreated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ResetPasswordToken` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_details_tbl`
--

INSERT INTO `user_details_tbl` (`UserID`, `AccountTypeID`, `EmailAddress`, `Password`, `DateCreated`, `ResetPasswordToken`) VALUES
(97, 2, 'stefanomedina17@gmail.com', '$2b$10$p7iNnyeTwkxN3a8L9qLXlucbzcJULg2YGL5wCl34LoS1CAZmyCxQa', '2024-05-19 15:26:53', NULL),
(100, 2, 'g12ageralimarie@gmail.com', '$2b$10$sy3yWcjR68T6z2zaYiD3BuqoOleOUree.SDyyV4hz8.e8E3QW5itC', '2024-05-21 10:44:35', '472478'),
(101, 2, 'maria.dolores.cruz94@email.com', '$2b$10$/H7fZkPCFSJxTLNanV5PXOUu.MjgLjgoC6AhDd2KuoI22IkcDGz5W', '2024-05-19 15:39:01', NULL),
(102, 2, 'flor_vermosa008@yahoo.com', '$2b$10$1i7JmdC2tPJxPndsZyqnq.xPHLPfUr9B3BehgGOtnykK/opI6T/x.', '2024-05-19 15:39:55', NULL),
(103, 2, 'anna.reyes@gmail.com', '$2b$10$JqmLew5mmxzJYOC9aYoBTuDLKItslJDIydGuKkPJdHoGLrAcnUwCW', '2024-05-19 15:41:28', NULL),
(104, 2, 'elisia_parmisano_santos@yahoo.com', '$2b$10$mC5iTtgvP4qQbZ4rQ1AtEOw7C1sgTa5c/fqaXCT9wEjgB38C4dSgm', '2024-05-19 15:42:19', NULL),
(105, 2, 'aquino.adrian2002@gmail.com', '$2b$10$9aDKx9/.wThvUgxzoePIMeguqn0UXFeT.pTp/wPqPFVnrEZuFSj/C', '2024-05-19 15:43:23', NULL),
(106, 3, 'johndoe10@gmail.com', '$2b$10$aA3LD05ToM.C2TKYOIIAIeX7dOI2ogp8UccZvSEBE3VyE8ug3thpq', '2024-05-19 16:09:44', NULL),
(107, 2, 'garcia.lina@hotmail.com', '$2b$10$Hhd4sXZVEBNcm1fNS1IbFeD3FLH1WRQUO7H7Ve4pCzw/QZLSE0pG6', '2024-05-19 16:16:31', NULL),
(108, 2, 'jose_marcelito@yahoo.com', '$2b$10$7tt9X0hU0kiEH6TFrK2rAe7kRT4ubkU7G3Vr8A9BctuLH8MV9EquG', '2024-05-19 16:17:19', NULL),
(109, 2, 'j.garcia1997@gmail.com', '$2b$10$lbDztnwJCr9lLdy57QSZge5LEixfg/lxhutgPglGWgyR2xR4YzKVq', '2024-05-19 16:19:26', NULL),
(110, 2, 'torres.caroline@gmail.com', '$2b$10$6BmtCHdZoHW2of6kgobw9euQ/AA6YgfirXAlvFfo80I5zdILhRkxq', '2024-05-19 16:21:10', NULL),
(111, 2, 'mfernandez08@icloud.com', '$2b$10$70.kIomNxfCWuNPMl2KofeuGx1lJ5vbwEXR3fuqjEmfPHJJil9Q1W', '2024-05-19 16:23:00', NULL),
(113, 3, 'salongauniqueph@gmail.com', '$2b$10$862iAL7AYY1rrz5/J/JrFOa8PAqXXuQiscPEorbtCYGg7GAhYtbES', '2024-05-19 16:54:13', NULL),
(114, 3, 'jdela.cruz@gmail.com', '$2b$10$/vWk6WzcgT2NW0L2RDQ8HOCGeoAAM497SFkp7rB7POmDvILlUjkCS', '2024-05-19 16:58:34', NULL),
(115, 3, 'deypalubosam1993@gmail.com', '$2b$10$RsBC82/SFDMaiSg7eWAqO.ahT7RuL1bKmXMBCCE6quzdj39nXbiiu', '2024-05-19 17:01:32', NULL),
(117, 3, 'zild.benitez.ph@yahoo.com', '$2b$10$kmP1YDPYAyBqNuUr32bPZ.rudlQCl0SCrevwIpFts86gQr0M5Zojq', '2024-05-19 17:12:02', NULL),
(119, 3, 'blaster.silonga.music@icloud.com', '$2b$10$eIWsHaNv6FoV2tFiETMRKeaevhJm.tP43ivqn.9BXwHXgB2iyNKhe', '2024-05-19 17:26:02', NULL),
(120, 3, 'felix.domingo_ph@gmail.com', '$2b$10$HRq8na83d3zftL2/ZY8TxOV1Q/bw6XzyWleDiwuidpYUH27EkeAy.', '2024-05-19 17:30:55', NULL),
(121, 3, 'ricardosalvador24@yahoo.com', '$2b$10$87Cm4bdq4ycAdkxDebvbbORdVtdIZzVUsf1B9raX.EncJRBsQK1ce', '2024-05-19 17:34:47', NULL),
(122, 3, 'nano.yu_adventures@hotmail.com', '$2b$10$4iybnPMpk7W67jJG4BC9iewZ4VRhg5cXa66krbToZYMuRIJU7EsQG', '2024-05-19 17:46:29', NULL),
(123, 3, 'm.ortega1987@gmail.com', '$2b$10$te31dLpp.ynY3Q1V.9E.becNMs5QMTUEkB8RQ84xHwJ/HaL3mHhNu', '2024-05-19 17:47:47', NULL),
(124, 3, 'g.decastro_24@yahoo.com', '$2b$10$ZE7tz1WVjy9ySc1pSqG9J.bHqNOHpgSMLt4UaMNi6gMmKMsIH./TS', '2024-05-19 17:49:21', NULL),
(125, 3, 'john.magsaysay@icloud.com', '$2b$10$rMfOiEESONBYexiOC2chweRqdZp4QjX7GOP2h3NHgqdJajZ2S2CES', '2024-05-19 17:50:32', NULL),
(126, 3, 'marconustre@hotmail.com', '$2b$10$KHhrCaY1SIFE3HddHT3EkOECKfXNd288FCzCASlxwBhnd.hWEpktO', '2024-05-19 17:51:49', NULL),
(127, 1, 'admin@shadala.com', '$2b$10$JGv0CmoUGkZ6/bl49RfU8.rnYaUX2GdVOOiS/hbdev/oo22zN.ef2', '2024-05-20 14:36:54', NULL),
(128, 2, 'maria.santos@example.com', '$2b$10$JMYYIVfQ8fqzBz.hJMB53u6B6/SB6At42xTHcLQPeyIaH1MWRlwPa', '2024-05-21 08:16:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_tbl`
--

CREATE TABLE `vehicle_tbl` (
  `VehicleID` int(11) NOT NULL,
  `DriverID` int(11) DEFAULT NULL,
  `PlateNumber` varchar(20) DEFAULT NULL,
  `VehicleModel` varchar(30) DEFAULT NULL,
  `VehicleColor` varchar(30) DEFAULT NULL,
  `VehicleType` varchar(30) DEFAULT NULL,
  `ValidLicenseImg` varchar(255) DEFAULT NULL,
  `OfficialReceiptImg` varchar(255) DEFAULT NULL,
  `CertificateOfRegImg` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicle_tbl`
--

INSERT INTO `vehicle_tbl` (`VehicleID`, `DriverID`, `PlateNumber`, `VehicleModel`, `VehicleColor`, `VehicleType`, `ValidLicenseImg`, `OfficialReceiptImg`, `CertificateOfRegImg`) VALUES
(72, 35, 'QCT 9012', 'Honda Civic ', 'Tangerine Dream', 'Sedan', '1716134984762_(1) Driver - Professional License.png', '1716134984793_(1) Driver - Certificate of Registrationn.png', '1716134984777_(1) Driver - Certificate of Registration.png'),
(73, 36, 'TAG 7891', 'Kawasaki Ninja', 'Turquoise Dream', 'Motorcycle', '1716137653348_(2) Driver - Professional License.png', '1716137653361_(2) Driver - Certificate of Registrationn.png', '1716137653352_(2) Driver - Certificate of Registration.png'),
(74, 37, 'MAK 3457', 'Toyota Camry', 'Turquoise Dream', 'Sedan', '1716137914679_(3) Driver - Professional License.png', '1716137914686_(3) Driver - Official Receipt 1.png', '1716137914681_(3) Driver - Certificate of Registration.png'),
(75, 38, 'MAL 2354', 'Honda Accord', 'Turquoise Dream', 'Sedan', '1716138092681_(4) Driver - Professional License.png', '1716138092687_(4) Driver - Official Receipt 1.png', '1716138092683_(4) Driver - Certificate of Registration.png'),
(77, 40, 'MNL 5678', 'Honda Odyssey', 'Turquoise Dream', 'MPV', '1716138722106_(5) Driver - Professional License.png', '1716138722113_(5) Driver - Certificate of Registrationn.png', '1716138722107_(5) Driver - Certificate of Registration.png'),
(79, 42, 'LMN 740', 'Toyota Hilux', 'Turquoise Dream', 'Small Truck', '1716139562489_(5) Driver - Professional License.png', '1716139562498_(5) Driver - Certificate of Registrationn.png', '1716139562491_(5) Driver - Certificate of Registration.png'),
(80, 43, 'FGH 462', 'Isuzu N-Series', 'Turquoise Dream', 'Medium Truck', '1716139855491_(5) Driver - Professional License.png', '1716139855495_(5) Driver - Certificate of Registrationn.png', '1716139855493_(5) Driver - Certificate of Registration.png'),
(81, 44, 'JHL 819', 'Hino Dutro', 'Turquoise Dream', 'Medium Truck', '1716140087055_(5) Driver - Professional License.png', '1716140087067_(5) Driver - Certificate of Registrationn.png', '1716140087057_(5) Driver - Certificate of Registration.png'),
(82, 45, 'STA 693', 'Volvo VNL', 'Turquoise Dream', 'Large Truck', '1716140789834_(5) Driver - Professional License.png', '1716140789861_(5) Driver - Certificate of Registrationn.png', '1716140789839_(5) Driver - Certificate of Registration.png'),
(86, 49, 'BLV 298', 'Mitsubishi Mirage G4', 'Turquoise Dream', 'Sedan', '1716141109763_(5) Driver - Professional License.png', '1716141109771_(5) Driver - Certificate of Registrationn.png', '1716141109764_(5) Driver - Certificate of Registration.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_type_tbl`
--
ALTER TABLE `account_type_tbl`
  ADD PRIMARY KEY (`AccountTypeID`);

--
-- Indexes for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  ADD PRIMARY KEY (`AdminID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `archived_booking_tbl`
--
ALTER TABLE `archived_booking_tbl`
  ADD PRIMARY KEY (`ArchiveID`),
  ADD KEY `BookingID` (`BookingID`),
  ADD KEY `CustomerID` (`CustomerID`);

--
-- Indexes for table `archived_complaint_tbl`
--
ALTER TABLE `archived_complaint_tbl`
  ADD PRIMARY KEY (`ArchiveID`),
  ADD KEY `ComplaintID` (`ComplaintID`);

--
-- Indexes for table `archived_driver_tbl`
--
ALTER TABLE `archived_driver_tbl`
  ADD PRIMARY KEY (`ArchiveID`),
  ADD KEY `DriverID` (`DriverID`);

--
-- Indexes for table `archived_users_tbl`
--
ALTER TABLE `archived_users_tbl`
  ADD PRIMARY KEY (`ArchivedID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `archived_vehicle_tbl`
--
ALTER TABLE `archived_vehicle_tbl`
  ADD PRIMARY KEY (`ArchiveID`),
  ADD KEY `VehicleID` (`VehicleID`);

--
-- Indexes for table `booking_tbl`
--
ALTER TABLE `booking_tbl`
  ADD PRIMARY KEY (`BookingID`);

--
-- Indexes for table `complaint_tbl`
--
ALTER TABLE `complaint_tbl`
  ADD PRIMARY KEY (`ComplaintID`),
  ADD KEY `BookingID` (`BookingID`,`CustomerID`);

--
-- Indexes for table `customer_tbl`
--
ALTER TABLE `customer_tbl`
  ADD PRIMARY KEY (`CustomerID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `driver_tbl`
--
ALTER TABLE `driver_tbl`
  ADD PRIMARY KEY (`DriverID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `VehicleID` (`VehicleID`);

--
-- Indexes for table `receiver_tbl`
--
ALTER TABLE `receiver_tbl`
  ADD PRIMARY KEY (`ReceiverID`),
  ADD KEY `BookingID` (`BookingID`);

--
-- Indexes for table `sender_tbl`
--
ALTER TABLE `sender_tbl`
  ADD PRIMARY KEY (`SenderID`),
  ADD KEY `BookingID` (`BookingID`);

--
-- Indexes for table `user_details_tbl`
--
ALTER TABLE `user_details_tbl`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `AccountTypeID` (`AccountTypeID`);

--
-- Indexes for table `vehicle_tbl`
--
ALTER TABLE `vehicle_tbl`
  ADD PRIMARY KEY (`VehicleID`),
  ADD UNIQUE KEY `PlateNumber` (`PlateNumber`),
  ADD UNIQUE KEY `PlateNumber_2` (`PlateNumber`),
  ADD KEY `DriverID` (`DriverID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_type_tbl`
--
ALTER TABLE `account_type_tbl`
  MODIFY `AccountTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  MODIFY `AdminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `archived_complaint_tbl`
--
ALTER TABLE `archived_complaint_tbl`
  MODIFY `ArchiveID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `archived_driver_tbl`
--
ALTER TABLE `archived_driver_tbl`
  MODIFY `ArchiveID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `archived_users_tbl`
--
ALTER TABLE `archived_users_tbl`
  MODIFY `ArchivedID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `archived_vehicle_tbl`
--
ALTER TABLE `archived_vehicle_tbl`
  MODIFY `ArchiveID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `booking_tbl`
--
ALTER TABLE `booking_tbl`
  MODIFY `BookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `complaint_tbl`
--
ALTER TABLE `complaint_tbl`
  MODIFY `ComplaintID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `customer_tbl`
--
ALTER TABLE `customer_tbl`
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `driver_tbl`
--
ALTER TABLE `driver_tbl`
  MODIFY `DriverID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `receiver_tbl`
--
ALTER TABLE `receiver_tbl`
  MODIFY `ReceiverID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `sender_tbl`
--
ALTER TABLE `sender_tbl`
  MODIFY `SenderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `user_details_tbl`
--
ALTER TABLE `user_details_tbl`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `vehicle_tbl`
--
ALTER TABLE `vehicle_tbl`
  MODIFY `VehicleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
