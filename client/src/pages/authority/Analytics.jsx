import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  MapPin,
} from "lucide-react";

function Analytics() {
  const issueTypes = [
    { name: "Illegal Parking", count: 12, percentage: 80 },
    { name: "Traffic Jam", count: 9, percentage: 60 },
    { name: "Road Accident", count: 6, percentage: 40 },
    { name: "Road Damage", count: 4, percentage: 27 },
    { name: "Traffic Signal", count: 3, percentage: 20 },
  ];

  const areas = [
    { name: "Civil Lines", complaints: 12 },
    { name: "Wardha Road", complaints: 9 },
    { name: "Manish Nagar", complaints: 7 },
    { name: "Sadar", complaints: 5 },
    { name: "Sitabuldi", complaints: 4 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <BarChart3 className="text-blue-600" size={25} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Traffic Analytics
              </h1>

              <p className="mt-1 text-slate-500">
                Monitor complaint trends and public safety statistics.
              </p>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* Total */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Total Complaints
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  34
                </h2>

                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp size={15} />
                  12% this month
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <FileText className="text-blue-600" size={22} />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Pending
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  12
                </h2>

                <p className="text-sm text-yellow-600 mt-2">
                  Requires attention
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center">
                <Clock className="text-yellow-600" size={22} />
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  In Progress
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  8
                </h2>

                <p className="text-sm text-blue-600 mt-2">
                  Currently being handled
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <TrendingUp className="text-blue-600" size={22} />
              </div>
            </div>
          </div>

          {/* Resolved */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Resolved
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  14
                </h2>

                <p className="text-sm text-green-600 mt-2">
                  41% resolution rate
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                <CheckCircle className="text-green-600" size={22} />
              </div>
            </div>
          </div>

        </div>

        {/* Main Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Issue Types */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Complaints by Issue Type
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Most frequently reported issues
                </p>
              </div>

              <BarChart3 className="text-blue-600" size={22} />
            </div>

            <div className="space-y-5">
              {issueTypes.map((issue) => (
                <div key={issue.name}>

                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      {issue.name}
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      {issue.count}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${issue.percentage}%` }}
                    />
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Complaint Status */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Complaint Status
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Current resolution overview
              </p>
            </div>

            <div className="space-y-6">

              {/* Pending */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center">
                  <Clock className="text-yellow-600" size={21} />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-slate-700">
                      Pending
                    </span>

                    <span className="font-semibold text-slate-900">
                      12
                    </span>
                  </div>

                  <div className="h-2 bg-slate-100 rounded-full">
                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: "35%" }}
                    />
                  </div>
                </div>
              </div>

              {/* In Progress */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <TrendingUp className="text-blue-600" size={21} />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-slate-700">
                      In Progress
                    </span>

                    <span className="font-semibold text-slate-900">
                      8
                    </span>
                  </div>

                  <div className="h-2 bg-slate-100 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: "24%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Resolved */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                  <CheckCircle className="text-green-600" size={21} />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-slate-700">
                      Resolved
                    </span>

                    <span className="font-semibold text-slate-900">
                      14
                    </span>
                  </div>

                  <div className="h-2 bg-slate-100 rounded-full">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: "41%" }}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Resolution Rate */}
            <div className="mt-8 p-4 bg-green-50 border border-green-100 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle
                  className="text-green-600"
                  size={22}
                />

                <div>
                  <p className="text-sm text-green-700">
                    Overall Resolution Rate
                  </p>

                  <p className="text-2xl font-bold text-green-800">
                    41%
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* High Priority + Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* High Priority */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                <AlertTriangle
                  className="text-red-600"
                  size={22}
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  High Priority Issues
                </h2>

                <p className="text-sm text-slate-500">
                  Complaints requiring immediate attention
                </p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <p className="text-4xl font-bold text-red-700">
                7
              </p>

              <p className="text-sm text-red-600 mt-1">
                high priority complaints reported
              </p>
            </div>

            <div className="mt-5 space-y-3">

              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm font-medium text-slate-700">
                  Road Accidents
                </span>

                <span className="font-bold text-red-600">
                  3
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm font-medium text-slate-700">
                  Illegal Parking
                </span>

                <span className="font-bold text-red-600">
                  2
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm font-medium text-slate-700">
                  Traffic Signals
                </span>

                <span className="font-bold text-red-600">
                  2
                </span>
              </div>

            </div>

          </div>

          {/* Areas */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                <MapPin
                  className="text-purple-600"
                  size={22}
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Top Complaint Areas
                </h2>

                <p className="text-sm text-slate-500">
                  Areas with highest reported issues
                </p>
              </div>
            </div>

            <div className="space-y-4">

              {areas.map((area, index) => (
                <div
                  key={area.name}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-slate-600">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">
                        {area.name}
                      </span>

                      <span className="text-sm font-bold text-slate-900">
                        {area.complaints}
                      </span>
                    </div>

                    <div className="h-2 bg-slate-100 rounded-full">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{
                          width: `${(area.complaints / 12) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <div className="flex gap-3">
            <BarChart3
              className="text-blue-600 flex-shrink-0"
              size={22}
            />

            <div>
              <h3 className="font-semibold text-blue-900">
                Analytics Overview
              </h3>

              <p className="text-sm text-blue-700 mt-1">
                These statistics help traffic authorities identify
                high-risk areas, prioritize complaints and improve
                response times.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Analytics;