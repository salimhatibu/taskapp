@extends('layouts.app')

@section('content')
<div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 text-gray-900">
                <h1 class="text-2xl font-bold mb-6">Welcome to TaskApp Dashboard</h1>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Task Statistics Card -->
                    <div class="bg-blue-50 p-6 rounded-lg">
                        <h3 class="text-lg font-semibold text-blue-800 mb-2">Total Tasks</h3>
                        <p class="text-3xl font-bold text-blue-600">0</p>
                        <p class="text-sm text-blue-500">No tasks yet</p>
                    </div>
                    
                    <!-- Completed Tasks Card -->
                    <div class="bg-green-50 p-6 rounded-lg">
                        <h3 class="text-lg font-semibold text-green-800 mb-2">Completed</h3>
                        <p class="text-3xl font-bold text-green-600">0</p>
                        <p class="text-sm text-green-500">All done!</p>
                    </div>
                    
                    <!-- Pending Tasks Card -->
                    <div class="bg-yellow-50 p-6 rounded-lg">
                        <h3 class="text-lg font-semibold text-yellow-800 mb-2">Pending</h3>
                        <p class="text-3xl font-bold text-yellow-600">0</p>
                        <p class="text-sm text-yellow-500">Ready to work</p>
                    </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="mt-8">
                    <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div class="flex flex-wrap gap-4">
                        <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
                            Add New Task
                        </button>
                        <button class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
                            View All Tasks
                        </button>
                        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                            Export Tasks
                        </button>
                    </div>
                </div>
                
                <!-- Recent Activity -->
                <div class="mt-8">
                    <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <p class="text-gray-600">No recent activity. Start by creating your first task!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
